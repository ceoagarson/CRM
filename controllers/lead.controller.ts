import { NextFunction, Request, Response } from "express"
import isMongoId from "validator/lib/isMongoId"
import xlsx from "xlsx"
import Lead from "../models/leads/lead.model.js"
import { User } from "../models/users/user.model.js"
import { ILead, TLeadBody } from "../types/models/lead.type.js"
import { Remark } from "../models/leads/remark.model.js"
import { IUser } from "../types/models/user.type.js"
import { uploadFileToCloudinary } from "../utils/uploadFile.util.js"
import { ILeadTemplate } from "../types/templates/lead.template.types.js"
import { isvalidDate } from "../utils/isValidDate.js"
import { Types } from "mongoose"


// create lead any one can do in the organization
export const CreateLead = async (req: Request, res: Response, next: NextFunction) => {
    let body = JSON.parse(req.body.body)
    let { mobile, remark, lead_owners, alternate_mobile1, alternate_mobile2, visiting_card } = body as TLeadBody & { remark: string, lead_owners: string[] }
    if (!lead_owners)
        return res.status(400).json({ message: "assign at least one lead owner" });
    if (lead_owners.length < 1)
        return res.status(400).json({ message: "assign at least one lead owner" });
    // validations
    if (!mobile)
        return res.status(400).json({ message: "provide primary mobile number" });

    let uniqueNumbers: string[] = []
    let oldLeads = await Lead.find()
    let OldNumbers: string[] = []
    oldLeads.forEach((lead) => {
        if (lead.mobile)
            OldNumbers.push(lead.mobile)
        if (lead.alternate_mobile1)
            OldNumbers.push(lead.alternate_mobile1)
        if (lead.alternate_mobile2)
            OldNumbers.push(lead.alternate_mobile2)
    })

    if (mobile && !OldNumbers.includes(mobile)) {
        uniqueNumbers.push(mobile)
        OldNumbers.push(mobile)
    }
    if (alternate_mobile1 && !OldNumbers.includes(alternate_mobile1)) {
        uniqueNumbers.push(alternate_mobile1)
        OldNumbers.push(alternate_mobile1)
    }
    if (alternate_mobile2 && !OldNumbers.includes(alternate_mobile2)) {
        uniqueNumbers.push(alternate_mobile2)
        OldNumbers.push(alternate_mobile2)
    }
    if (uniqueNumbers.length == 0) {
        return res.status(400).json({ message: "one of the mobile numbers already exists" });
    }
    let new_lead_owners: IUser[] = []
    let owners = String(lead_owners).split(",")
    for (let i = 0; i < owners.length; i++) {
        let owner = await User.findById(owners[i])
        if (owner)
            new_lead_owners.push(owner)
    }

    visiting_card = {
        public_id: "",
        url: "",
        size: 0,
        format: ""
    }
    if (req.file) {
        const allowedFiles = ["image/png", "image/jpeg", "image/gif", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv", "application/pdf"];
        const storageLocation = `leads/documents`;
        if (!allowedFiles.includes(req.file.mimetype))
            return res.status(400).json({ message: `${req.file.originalname} is not valid, only ${allowedFiles} types are allowed to upload` })
        if (req.file.size > 500 * 1024)
            return res.status(400).json({ message: `${req.file.originalname} is too large limit is :200Kb` })
        const doc = await uploadFileToCloudinary(req.file.path, storageLocation)
        if (doc)
            visiting_card = doc
        else {
            return res.status(500).json({ message: "file uploading error" })
        }
    }
    let lead = new Lead({
        ...body,
        visiting_card: visiting_card,
        mobile: uniqueNumbers[0] || null,
        alternate_mobile1: uniqueNumbers[1] || null,
        alternate_mobile2: uniqueNumbers[2] || null,
        lead_owners_username: new_lead_owners.map(user => { return user.username }),
        lead_owners: new_lead_owners,
        created_by_username: req.user?.username,
        updated_by_username: req.user?.username,
        created_by: req.user,
        updated_by: req.user,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
    })
    if (remark) {
        let new_remark = new Remark({
            remark,
            lead: lead,
            created_at: new Date(),
            created_by: req.user,
            updated_at: new Date(),
            updated_by: req.user
        })
        await new_remark.save()
        lead.last_remark = remark
        lead.remarks = [new_remark]
    }
    await lead.save()
    return res.status(200).json("lead created")
}

// get all leads  anyone can do in the organization
export const GetLeads = async (req: Request, res: Response, next: NextFunction) => {
    let limit = Number(req.query.limit)
    let page = Number(req.query.page)
    if (!Number.isNaN(limit) && !Number.isNaN(page)) {
        let leads = await Lead.find({ is_customer: false }).populate('lead_owners').populate('updated_by').populate('created_by').populate({
            path: 'remarks',
            populate: [
                {
                    path: 'created_by',
                    model: 'User'
                },
                {
                    path: 'updated_by',
                    model: 'User'
                }
            ]
        }).sort('-updated_at')
            .limit(limit * 1)
            .skip((page - 1) * limit)

        let count = await Lead.countDocuments()
        if (req.user?.is_admin)
            return res.status(200).json({
                leads,
                total: Math.ceil(count / limit),
                page: page,
                limit: limit
            })

        leads = leads.filter((lead) => {
            let owners = lead.lead_owners.filter((owner) => {
                return owner.username === req.user?.username
            })
            if (owners.length > 0)
                return lead
        })
        return res.status(200).json({
            leads,
            total: Math.ceil(count / limit),
            page: page,
            limit: limit
        })
    }
    else
        return res.status(500).json({ message: "bad request" })

}

export const GetCustomers = async (req: Request, res: Response, next: NextFunction) => {
    let limit = Number(req.query.limit)
    let page = Number(req.query.page)
    if (!Number.isNaN(limit) && !Number.isNaN(page)) {
        let leads = await Lead.find({ is_customer: true }).populate('lead_owners').populate('updated_by').populate('created_by').populate({
            path: 'remarks',
            populate: [
                {
                    path: 'created_by',
                    model: 'User'
                },
                {
                    path: 'updated_by',
                    model: 'User'
                }
            ]
        }).sort('-updated_at')
            .limit(limit * 1)
            .skip((page - 1) * limit)

        let count = await Lead.countDocuments()
        if (req.user?.is_admin)
            return res.status(200).json({
                leads,
                total: Math.ceil(count / limit),
                page: page,
                limit: limit
            })

        leads = leads.filter((lead) => {
            let owners = lead.lead_owners.filter((owner) => {
                return owner.username === req.user?.username
            })
            if (owners.length > 0)
                return lead
        })
        return res.status(200).json({
            leads,
            total: Math.ceil(count / limit),
            page: page,
            limit: limit
        })
    }
    else
        return res.status(500).json({ message: "bad request" })

}


// update lead only admin can do
export const UpdateLead = async (req: Request, res: Response, next: NextFunction) => {
    let body = JSON.parse(req.body.body)
    const { mobile, remark, lead_owners, alternate_mobile1, alternate_mobile2 } = body as TLeadBody & { remark: string, lead_owners: string[] }
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(400).json({ message: "lead id not valid" })
    let lead = await Lead.findById(id);
    if (!lead) {
        return res.status(404).json({ message: "lead not found" })
    }
    if (!lead_owners)
        return res.status(400).json({ message: "assign at least one lead owner" });
    if (lead_owners.length < 1)
        return res.status(400).json({ message: "assign at least one lead owner" });
    // validations
    if (!mobile)
        return res.status(400).json({ message: "provide primary mobile number" });

    let uniqueNumbers: string[] = []
    let oldLeads = await Lead.find()
    let OldNumbers: string[] = []
    oldLeads.forEach((lead) => {
        if (lead.mobile)
            OldNumbers.push(lead.mobile)
        if (lead.alternate_mobile1)
            OldNumbers.push(lead.alternate_mobile1)
        if (lead.alternate_mobile2)
            OldNumbers.push(lead.alternate_mobile2)
    })
    if (mobile !== lead.mobile)
        if (mobile && !OldNumbers.includes(mobile)) {
            uniqueNumbers[0] = (mobile)
            OldNumbers.push(mobile)
        }
    if (alternate_mobile1 !== lead.alternate_mobile1)
        if (alternate_mobile1 && !OldNumbers.includes(alternate_mobile1)) {
            uniqueNumbers[1] = (alternate_mobile1)
            OldNumbers.push(alternate_mobile1)
        }
    if (alternate_mobile2 !== lead.alternate_mobile2)
        if (alternate_mobile2 && !OldNumbers.includes(alternate_mobile2)) {
            uniqueNumbers[2] = (alternate_mobile2)
            OldNumbers.push(alternate_mobile2)
        }
    let new_lead_owners: IUser[] = []
    let owners = String(lead_owners).split(",")
    for (let i = 0; i < owners.length; i++) {
        let owner = await User.findById(owners[i])
        if (owner)
            new_lead_owners.push(owner)
    }

    let visiting_card = lead?.visiting_card;
    if (req.file) {
        const allowedFiles = ["image/png", "image/jpeg", "image/gif", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv", "application/pdf"];
        const storageLocation = `leads/documents`;
        if (!allowedFiles.includes(req.file.mimetype))
            return res.status(400).json({ message: `${req.file.originalname} is not valid, only ${allowedFiles} types are allowed to upload` })
        if (req.file.size > 500 * 1024)
            return res.status(400).json({ message: `${req.file.originalname} is too large limit is :200Kb` })
        const doc = await uploadFileToCloudinary(req.file.path, storageLocation)
        if (doc)
            visiting_card = doc
        else {
            return res.status(500).json({ message: "file uploading error" })
        }
    }
    if (remark) {
        if (!lead.last_remark) {
            let new_remark = new Remark({
                remark,
                lead: lead,
                created_at: new Date(),
                created_by: req.user,
                updated_at: new Date(),
                updated_by: req.user
            })
            await new_remark.save()
            lead.last_remark = remark
            lead.remarks = [new_remark]
        }
        else {
            let last_remark = lead.remarks[lead.remarks.length - 1]
            await Remark.findByIdAndUpdate(last_remark._id, {
                remark: remark,
                lead: lead,
                updated_at: new Date(),
                updated_by: req.user,
                updated_by_username: req.user?.username,
            })
            lead.last_remark = last_remark.remark
        }
    }
    await Lead.findByIdAndUpdate(lead._id, {
        ...body,
        mobile: uniqueNumbers[0] || lead.mobile || null,
        alternate_mobile1: uniqueNumbers[1] || lead.alternate_mobile1 || null,
        alternate_mobile2: uniqueNumbers[2] || lead.alternate_mobile2 || null,
        lead_owners: new_lead_owners,
        lead_owners_username: new_lead_owners.map(user => { return user.username }),
        visiting_card: visiting_card,
        updated_by: req.user,
        updated_by_username: req.user?.username,
        updated_at: new Date(Date.now()),
        remarks: lead.remarks
    })

    return res.status(200).json({ message: "lead updated" })
}

//delete lead
export const DeleteLead = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "lead id not valid" })
    let lead = await Lead.findById(id);
    if (!lead) {
        return res.status(404).json({ message: "lead not found" })
    }
    let remarks = await Remark.find({ lead: lead._id })
    remarks.map(async (remark) => {
        await remark.remove()
    })
    await lead.remove()
    return res.status(200).json({ message: "lead and related remarks are deleted" })
}

// add new remarks on lead
export const NewRemark = async (req: Request, res: Response, next: NextFunction) => {
    const { remark } = req.body
    if (!remark) return res.status(403).json({ message: "please fill required fields" })
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(403).json({ message: "please login to access this resource" })
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "lead id not valid" })

    let lead = await Lead.findById(id);
    if (!lead) {
        return res.status(404).json({ message: "lead not found" })
    }
    let new_remark = new Remark({
        remark,
        lead: lead,
        created_at: new Date(Date.now()),
        created_by: req.user,
        updated_at: new Date(Date.now()),
        updated_by: req.user
    })
    await new_remark.save()
    let updatedRemarks = lead.remarks
    updatedRemarks.push(new_remark)
    lead.last_remark = remark
    lead.remarks = updatedRemarks
    if (req.user) {
        lead.updated_by = req.user
        lead.updated_by_username = req.user?.username
        lead.updated_at = new Date(Date.now())
    }
    await lead.save()
    return res.status(200).json({ message: "new remark added successfully" })
}

export const BulkLeadUpdateFromExcel = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        const allowedFiles = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"];
        if (!allowedFiles.includes(req.file.mimetype))
            return res.status(400).json({ message: `${req.file.originalname} is not valid, only excel and csv are allowed to upload` })
        if (req.file.size > 10 * 1024 * 1024)
            return res.status(400).json({ message: `${req.file.originalname} is too large limit is :10mb` })
        const workbook = xlsx.readFile(req.file.path);
        let workbook_sheet = workbook.SheetNames;
        let workbook_response: ILeadTemplate[] = xlsx.utils.sheet_to_json(
            workbook.Sheets[workbook_sheet[0]]
        );
        let statusText: string = ""
        let result: ILeadTemplate[] = []
        let oldLeads = await Lead.find()
        let OldNumbers: number[] = []
        oldLeads.forEach((lead) => {
            if (lead.mobile)
                OldNumbers.push(Number(lead.mobile))
            if (lead.alternate_mobile1)
                OldNumbers.push(Number(lead.alternate_mobile1))
            if (lead.alternate_mobile2)
                OldNumbers.push(Number(lead.alternate_mobile2))
        })

        workbook_response.forEach(async (lead) => {
            let mobile: number | null = Number(lead.mobile)
            let alternate_mobile1: number | null = Number(lead.alternate_mobile1)
            let alternate_mobile2: number | null = Number(lead.alternate_mobile2)
            let created_by: IUser | undefined = undefined
            let updated_by: IUser | undefined = undefined
            let new_lead_owners: IUser[] = []
            let validated = true

            //important
            if (mobile && Number.isNaN(mobile)) {
                validated = false
                statusText = "invalid mobile"
            }
            if (alternate_mobile1 && Number.isNaN(alternate_mobile1)) {
                validated = false
                statusText = "invalid alternate mobile 1"
            }
            if (alternate_mobile2 && Number.isNaN(alternate_mobile2)) {
                validated = false
                statusText = "invalid alternate mobile 2"
            }
            if (alternate_mobile1 && String(alternate_mobile1).length !== 10)
                alternate_mobile1 = null
            if (alternate_mobile2 && String(alternate_mobile2).length !== 10)
                alternate_mobile2 = null

            if (lead.is_customer && typeof (lead.is_customer) !== "boolean") {
                validated = false
                statusText = "invalid is icustomer"
            }
            if (mobile && String(mobile).length !== 10) {
                validated = false
                statusText = "invalid mobile"
            }
            if (lead.last_whatsapp_date && !isvalidDate(new Date(lead.last_whatsapp_date))) {
                validated = false
                statusText = "invalid date"
            }
            if (lead.created_at && !isvalidDate(new Date(lead.created_at))) {
                validated = false
                statusText = "invalid date"
            }
            if (lead.updated_at && !isvalidDate(new Date(lead.updated_at))) {
                validated = false
                statusText = "invalid date"
            }

            // duplicate number checker
            let uniqueNumbers: number[] = []
            if (mobile && !OldNumbers.includes(mobile)) {
                uniqueNumbers.push(mobile)
                OldNumbers.push(mobile)

            }
            else
                statusText = "duplicate"
            if (alternate_mobile1 && !OldNumbers.includes(alternate_mobile1)) {
                uniqueNumbers.push(alternate_mobile1)
                OldNumbers.push(alternate_mobile1)
            }
            if (alternate_mobile2 && !OldNumbers.includes(alternate_mobile2)) {
                uniqueNumbers.push(alternate_mobile2)
                OldNumbers.push(alternate_mobile2)
            }
            if (uniqueNumbers.length === 0)
                validated = false

            if (!isMongoId(String(lead._id)) && !validated) {
                result.push({
                    ...lead,
                    status: statusText
                })
            }

            if (lead.lead_owners) {
                let lead_owners = String((lead.lead_owners)).split(",")
                lead_owners.map(async (name) => {
                    let owner = await User.findOne({ username: name })
                    if (owner)
                        new_lead_owners.push(owner)
                })
            }
            if (new_lead_owners.length === 0 && req.user)
                new_lead_owners.push(req.user)


            if (lead.created_by) {
                let user = await User.findOne({ username: lead.created_by })
                if (user)
                    created_by = user
                if (!user && req.user)
                    created_by = req.user

            }


            if (lead.updated_by) {
                let user = await User.findOne({ username: lead.updated_by })
                if (user)
                    updated_by = user

                if (!user && req.user)
                    updated_by = req.user
            }


            console.log(validated)
            //update and create new nead
            if (lead._id && isMongoId(String(lead._id))) {
                let targetLead = await Lead.findById(lead._id)
                if (targetLead) {
                    if (lead.remarks) {
                        if (!lead.remarks.length) {
                            let new_remark = new Remark({
                                remark: lead.remarks,
                                lead: lead,
                                created_at: new Date(),
                                created_by: req.user,
                                updated_at: new Date(),
                                updated_by: req.user
                            })
                            await new_remark.save()
                            targetLead.last_remark = lead.remarks
                            targetLead.remarks = [new_remark]
                        }
                        else {
                            let last_remark = targetLead.remarks[targetLead.remarks.length - 1]
                            await Remark.findByIdAndUpdate(last_remark._id, {
                                remark: lead.remarks,
                                lead: lead,
                                updated_at: new Date(),
                                updated_by: req.user
                            })
                            targetLead.last_remark = last_remark.remark
                        }

                    }

                    await Lead.findByIdAndUpdate(lead._id, {
                        ...lead,
                        remarks: targetLead.remarks,
                        mobile: uniqueNumbers[0] || mobile,
                        alternate_mobile1: uniqueNumbers[1] || alternate_mobile1 || null,
                        alternate_mobile2: uniqueNumbers[2] || alternate_mobile2 || null,
                        lead_owners: new_lead_owners,
                        lead_owners_username: new_lead_owners.map(user => { return user.username }),
                        updated_by: updated_by,
                        updated_by_username: updated_by?.username,
                        updated_at: new Date(Date.now())
                    })
                }

            }
            if (validated) {
                if (!lead._id || !isMongoId(String(lead._id))) {
                    let newlead = new Lead({
                        ...lead,
                        _id: new Types.ObjectId(),
                        mobile: uniqueNumbers[0] || null,
                        alternate_mobile1: uniqueNumbers[1] || null,
                        alternate_mobile2: uniqueNumbers[2] || null,
                        lead_owners: new_lead_owners,
                        lead_owners_username: new_lead_owners.map(user => { return user.username }),
                        created_by: created_by || req.user,
                        updated_by: updated_by || req.user,
                        updated_by_username: updated_by?.username,
                        created_by_username: created_by?.username,
                        updated_at: new Date(Date.now()),
                        created_at: new Date(Date.now()),
                    })
                    if (lead.remarks) {
                        let new_remark = new Remark({
                            remark: lead.remarks,
                            lead: newlead,
                            created_at: new Date(),
                            created_by: req.user,
                            updated_at: new Date(),
                            updated_by: req.user
                        })
                        await new_remark.save()
                        newlead.last_remark = lead.remarks
                        newlead.remarks = [new_remark]

                    }
                    await newlead.save()
                }
            }
        })
        return res.status(200).json(result);
    }
    return res.status(404).json({
        message: "please provide an Excel file",
    });
}

export const ConvertCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "lead id not valid" })
    let lead = await Lead.findById(id);
    if (!lead) {
        return res.status(404).json({ message: "lead not found" })
    }
    await Lead.findByIdAndUpdate(id, {
        is_customer: true,
        updated_by_username: req.user?.username,
        updated_by: req.user,
        updated_at: new Date(Date.now()),
    })
    return res.status(200).json({ message: "new customer created" })
}


export const AdvancedQuery = async (req: Request, res: Response, next: NextFunction) => {
    const { city, owner, searchString, isOr } = req.body
    const keys = String(searchString).split(",")
    let user = await User.findOne({ username: owner })
    let leads: ILead[] = []
    if (isOr) {
        leads = await Lead.find({
            $or: [
                { city: { $regex: keys[0] } },
                { owner: { $regex: user } }
            ]
        })
    }
    else {
        leads = await Lead.find({
            $and: [
                { city: { $regex: keys[0] } },
                { owner: { $regex: user } }
            ]
        })
    }
    return res.status(200).json(leads)
}

export const FuzzySearchLeads = async (req: Request, res: Response, next: NextFunction) => {
    let key = String(req.query.key)
    if (!key)
        return res.status(500).json({ message: "bad request" })
    let leads: ILead[] = []
    leads = await Lead.find({
        is_customer: false,
        $text: { $search: key, $caseSensitive: false }
    }
    ).populate('lead_owners').populate('updated_by').populate('created_by').populate({
        path: 'remarks',
        populate: [
            {
                path: 'created_by',
                model: 'User'
            },
            {
                path: 'updated_by',
                model: 'User'
            }
        ]
    }).sort('-updated_at')
    if (req.user?.is_admin)
        return res.status(200).json(leads)

    leads = leads.filter((lead) => {
        let owners = lead.lead_owners.filter((owner) => {
            return owner.username === req.user?.username
        })
        if (owners.length > 0)
            return lead
    })
    return res.status(200).json(leads)
}
export const FuzzySearchCustomers = async (req: Request, res: Response, next: NextFunction) => {
    let key = String(req.query.key)
    if (!key)
        return res.status(500).json({ message: "bad request" })
    let leads: ILead[] = []
    leads = await Lead.find({
        is_customer: true,
        $text: { $search: key, $caseSensitive: false }
    }
    ).populate('lead_owners').populate('updated_by').populate('created_by').populate({
        path: 'remarks',
        populate: [
            {
                path: 'created_by',
                model: 'User'
            },
            {
                path: 'updated_by',
                model: 'User'
            }
        ]
    }).sort('-updated_at')

    if (req.user?.is_admin)
        return res.status(200).json(leads)

    leads = leads.filter((lead) => {
        let owners = lead.lead_owners.filter((owner) => {
            return owner.username === req.user?.username
        })
        if (owners.length > 0)
            return lead
    })
    return res.status(200).json(leads)
}