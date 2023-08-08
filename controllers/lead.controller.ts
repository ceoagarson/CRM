import { NextFunction, Request, Response } from "express"
import isMongoId from "validator/lib/isMongoId"
import xlsx from "xlsx"
import Lead from "../models/leads/lead.model.js"
import { User } from "../models/users/user.model.js"
import { TLeadBody } from "../types/crm/lead.type.js"
import { Remark } from "../models/leads/remark.model.js"
import { IUser } from "../types/users/user.type.js"
import { uploadFileToCloudinary } from "../utils/uploadFile.util.js"
import { ILeadTemplate } from "../types/crm/lead.template.types.js"
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

    let uniqueNumbers: number[] = []
    if (mobile) {
        if (!await Lead.findOne({ mobile: mobile }))
            if (!await Lead.findOne({ alternate_mobile1: mobile }))
                if (!await Lead.findOne({ alternate_mobile2: mobile }))
                    uniqueNumbers.push(mobile)
    }
    if (alternate_mobile1) {
        if (!await Lead.findOne({ mobile: alternate_mobile1 }))
            if (!await Lead.findOne({ alternate_mobile1: alternate_mobile1 }))
                if (!await Lead.findOne({ alternate_mobile2: alternate_mobile1 }))
                    uniqueNumbers.push(alternate_mobile1)
    }
    if (alternate_mobile2) {
        if (!await Lead.findOne({ mobile: alternate_mobile2 }))
            if (!await Lead.findOne({ alternate_mobile1: alternate_mobile2 }))
                if (!await Lead.findOne({ alternate_mobile2: alternate_mobile2 }))
                    uniqueNumbers.push(alternate_mobile2)
    }

    if (uniqueNumbers.length == 0) {
        return res.status(400).json({ message: "one of the mobile numbers already exists" });
    }
    let new_lead_owners: IUser[] = []
    for (let i = 0; i < lead_owners.length; i++) {
        let owner = await User.findById(lead_owners[i])
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
    const lead = new Lead({
        ...req.body,
        visiting_card: visiting_card,
        mobile: uniqueNumbers[0] || null,
        alternate_mobile1: uniqueNumbers[1] || alternate_mobile1 || null,
        alternate_mobile2: uniqueNumbers[2] || alternate_mobile2 || null,
        lead_owners: new_lead_owners,
        created_by: req.user?._id,
        updated_by: req.user?._id,
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
        lead.remarks = [new_remark]
    }
    await lead.save()
    return res.status(200).json("lead created")
}

// get all leads  anyone can do in the organization
export const GetLeads = async (req: Request, res: Response, next: NextFunction) => {
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
    })
    if (!leads) {
        return res.status(404).json({ message: "leads not found" })
    }
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

export const GetCustomers = async (req: Request, res: Response, next: NextFunction) => {
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
    })
    if (!leads) {
        return res.status(404).json({ message: "leads not found" })
    }
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

    let uniqueNumbers: number[] = []

    if (mobile) {
        if (mobile !== lead.mobile)
            if (!await Lead.findOne({ mobile: mobile }))
                if (!await Lead.findOne({ alternate_mobile1: mobile }))
                    if (!await Lead.findOne({ alternate_mobile2: mobile }))
                        uniqueNumbers.push(mobile)
    }

    if (alternate_mobile1) {
        if (alternate_mobile1 !== lead.alternate_mobile1)
            if (!await Lead.findOne({ mobile: alternate_mobile1 }))
                if (!await Lead.findOne({ alternate_mobile1: alternate_mobile1 }))
                    if (!await Lead.findOne({ alternate_mobile2: alternate_mobile1 }))
                        uniqueNumbers.push(alternate_mobile1)
    }
    if (alternate_mobile2) {
        if (alternate_mobile2 !== lead.alternate_mobile2)
            if (!await Lead.findOne({ mobile: alternate_mobile2 }))
                if (!await Lead.findOne({ alternate_mobile1: alternate_mobile2 }))
                    if (!await Lead.findOne({ alternate_mobile2: alternate_mobile2 }))
                        uniqueNumbers.push(alternate_mobile2)
    }
    if (mobile !== lead.mobile)
        if (alternate_mobile1 !== lead.alternate_mobile1)
            if (alternate_mobile2 !== lead.alternate_mobile2)
                if (uniqueNumbers.length === 0) {
                    return res.status(400).json({ message: "one of the mobile numbers already exists" });
                }
    let new_lead_owners: IUser[] = []
    for (let i = 0; i < lead_owners.length; i++) {
        let owner = await User.findById(lead_owners[i])
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
        if (!lead.remarks.length) {
            let new_remark = new Remark({
                remark,
                lead: lead,
                created_at: new Date(),
                created_by: req.user,
                updated_at: new Date(),
                updated_by: req.user
            })
            await new_remark.save()
            lead.remarks = [new_remark]
        }
        else {
            let last_remark = lead.remarks[lead.remarks.length - 1]
            await Remark.findByIdAndUpdate(last_remark._id, {
                remark: remark,
                lead: lead,
                updated_at: new Date(),
                updated_by: req.user
            })
        }

    }
    await Lead.findByIdAndUpdate(lead._id, {
        ...req.body,
        mobile: uniqueNumbers[0] || mobile,
        alternate_mobile1: uniqueNumbers[1] || alternate_mobile1 || null,
        alternate_mobile2: uniqueNumbers[2] || alternate_mobile2 || null,
        lead_owners: new_lead_owners,
        visiting_card: visiting_card,
        created_by: req.user?._id,
        updated_by: req.user?._id,
        created_at: new Date(Date.now()),
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
    lead.remarks = updatedRemarks
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

        workbook_response.forEach(async (lead) => {
            let uniqueNumbers: number[] = []
            let mobile = Number(lead.mobile)
            let alternate_mobile1 = Number(lead.alternate_mobile1)
            let alternate_mobile2 = Number(lead.alternate_mobile2)
            let created_by: IUser | undefined = undefined
            let updated_by: IUser | undefined = undefined
            let new_lead_owners: IUser[] = []
            let validated = true
            let leadTypes = ["retail", "wholesale", "company", "wholesale&retail"]
            let stages = ["open", "closed", "useless", "potential"]
            let sources = ["internet", "visit", "whatsapp", "cold calling",
                "cold email", "others"]

            if (lead.lead_type && !leadTypes.includes(lead.lead_type))
                validated = false
            if (lead.stage && !stages.includes(lead.stage))
                validated = false
            if (lead.lead_source && !sources.includes(lead.lead_source))
                validated = false
            if (mobile && typeof (mobile) !== "number")
                validated = false
            if (lead.turnover && typeof (lead.turnover) !== "number")
                validated = false
            if (alternate_mobile1 && typeof (alternate_mobile1) !== "number")
                validated = false
            if (alternate_mobile2 && typeof (alternate_mobile2) !== "number")
                validated = false
            if (lead.name && typeof (lead.name) !== "string")
                validated = false

            if (lead.customer_name && typeof (lead.customer_name) !== "string")
                validated = false
            if (lead.customer_designation && typeof (lead.customer_designation) !== "string")
                validated = false
            if (lead.email && typeof (lead.email) !== "string")
                validated = false

            if (lead.state && typeof (lead.state) !== "string")
                validated = false
            if (lead.country && typeof (lead.country) !== "string")
                validated = false
            if (lead.address && typeof (lead.address) !== "string")
                validated = false
            if (lead.alternate_email && typeof (lead.alternate_email) !== "string")
                validated = false

            if (lead.work_description && typeof (lead.work_description) !== "string")
                validated = false
            if (lead.stage && typeof (lead.stage) !== "string")
                validated = false
            if (lead.lead_type && typeof (lead.lead_type) !== "string")
                validated = false
            if (lead.lead_source && typeof (lead.lead_source) !== "string")
                validated = false

            if (lead.remarks && typeof (lead.remarks) !== "string")
                validated = false
            if (lead.visiting_card && typeof (lead.visiting_card) !== "string")
                validated = false
            if (lead.is_customer && typeof (lead.is_customer) !== "boolean")
                validated = false

            if (lead.lead_owners && typeof (lead.lead_owners) !== "string")
                validated = false
            if (lead.created_by && typeof (lead.created_by) !== "string")
                validated = false
            if (lead.updated_by && typeof (lead.updated_by) !== "string")
                validated = false

            if (lead.last_whatsapp_date && !isvalidDate(new Date(lead.last_whatsapp_date)))
                validated = false

            if (lead.created_at && !isvalidDate(new Date(lead.created_at)))
                validated = false
            if (lead.updated_at && !isvalidDate(new Date(lead.updated_at)))
                validated = false
            if (mobile && String(mobile).length !== 10)
                validated = false
            if (alternate_mobile1 && String(alternate_mobile1).length !== 10)
                validated = false
            if (alternate_mobile2 && String(alternate_mobile2).length !== 10)
                validated = false
            console.log(validated)
            if (validated) {
                if (lead.lead_owners) {
                    let lead_owners = String((lead.lead_owners)).split(",")
                    lead_owners.map(async (name) => {
                        let owner = await User.findOne({ username: name })
                        if (owner)
                            new_lead_owners.push(owner)
                    })
                }
                else {
                    if (req.user)
                        new_lead_owners.push(req.user)
                }

                if (lead.created_by) {
                    let user = await User.findOne({ username: lead.created_by })
                    if (user)
                        created_by = user
                }
                else if (req.user)
                    created_by = req.user

                if (lead.updated_by) {
                    let user = await User.findOne({ username: lead.updated_by })
                    if (user)
                        updated_by = user
                }
                else if (req.user)
                    updated_by = req.user

                if (lead._id && isMongoId(String(lead._id))) {
                    console.log("updating..")
                    if (mobile) {
                        if (mobile !== lead.mobile)
                            if (!await Lead.findOne({ mobile: mobile }))
                                if (!await Lead.findOne({ alternate_mobile1: mobile }))
                                    if (!await Lead.findOne({ alternate_mobile2: mobile }))
                                        uniqueNumbers.push(mobile)
                    }
                    if (alternate_mobile1) {
                        if (alternate_mobile1 !== lead.alternate_mobile1)
                            if (!await Lead.findOne({ mobile: alternate_mobile1 }))
                                if (!await Lead.findOne({ alternate_mobile1: alternate_mobile1 }))
                                    if (!await Lead.findOne({ alternate_mobile2: alternate_mobile1 }))
                                        uniqueNumbers.push(alternate_mobile1)
                    }
                    if (alternate_mobile2) {
                        if (alternate_mobile2 !== lead.alternate_mobile2)
                            if (!await Lead.findOne({ mobile: alternate_mobile2 }))
                                if (!await Lead.findOne({ alternate_mobile1: alternate_mobile2 }))
                                    if (!await Lead.findOne({ alternate_mobile2: alternate_mobile2 }))
                                        uniqueNumbers.push(alternate_mobile2)
                    }
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
                            }

                        }

                        await Lead.findByIdAndUpdate(lead._id, {
                            ...lead,
                            remarks: targetLead.remarks,
                            mobile: uniqueNumbers[0] || mobile,
                            alternate_mobile1: uniqueNumbers[1] || alternate_mobile1 || null,
                            alternate_mobile2: uniqueNumbers[2] || alternate_mobile2 || null,
                            lead_owners: new_lead_owners,
                            created_by: created_by,
                            updated_by: updated_by
                        })
                    }

                }

                if (!lead._id || !isMongoId(String(lead._id))) {

                    if (mobile) {
                        if (!await Lead.findOne({ mobile: mobile }))
                            if (!await Lead.findOne({ alternate_mobile1: mobile }))
                                if (!await Lead.findOne({ alternate_mobile2: mobile }))
                                    uniqueNumbers.push(mobile)
                    }
                    if (alternate_mobile1) {
                        if (!await Lead.findOne({ mobile: alternate_mobile1 }))
                            if (!await Lead.findOne({ alternate_mobile1: alternate_mobile1 }))
                                if (!await Lead.findOne({ alternate_mobile2: alternate_mobile1 }))
                                    uniqueNumbers.push(alternate_mobile1)
                    }
                    if (alternate_mobile2) {
                        if (!await Lead.findOne({ mobile: alternate_mobile2 }))
                            if (!await Lead.findOne({ alternate_mobile1: alternate_mobile2 }))
                                if (!await Lead.findOne({ alternate_mobile2: alternate_mobile2 }))
                                    uniqueNumbers.push(alternate_mobile2)
                    }
                    if (uniqueNumbers.length !== 0) {
                        let newlead = new Lead({
                            ...lead,
                            _id: new Types.ObjectId(),
                            mobile: uniqueNumbers[0] || null,
                            alternate_mobile1: uniqueNumbers[1] || alternate_mobile1 || null,
                            alternate_mobile2: uniqueNumbers[2] || alternate_mobile2 || null,
                            lead_owners: new_lead_owners,
                            created_by: created_by,
                            updated_by: updated_by
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
                            newlead.remarks = [new_remark]

                        }
                        await newlead.save()
                    }
                }
            }
        })
        return res.status(200).send({
            message: workbook_response,
        });
    }
    return res.status(404).send({
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
    await Lead.findByIdAndUpdate(id, { is_customer: true })
    return res.status(200).json({ message: "new customer created" })
}