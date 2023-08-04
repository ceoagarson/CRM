import { NextFunction, Request, Response } from "express"
import isMongoId from "validator/lib/isMongoId"
import xlsx from "xlsx"
import Lead from "../models/leads/lead.model.js"
import { User } from "../models/users/user.model.js"
import { ILead, TLeadBody } from "../types/crm/lead.type.js"
import { Remark } from "../models/leads/remark.model.js"
import { IUser } from "../types/users/user.type.js"
import { Asset } from "../types/users/asset.type.js"
import { uploadFileToCloudinary } from "../utils/uploadFile.util.js"
import { destroyFile } from "../utils/destroyFile.util.js"
import fs from 'fs';


// create lead any one can do in the organization
export const CreateLead = async (req: Request, res: Response, next: NextFunction) => {
    const { mobile, remark, lead_owners, alternate_mobile1, alternate_mobile2 } = req.body as TLeadBody & { remark: string, lead_owners: string[] }
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
    let visiting_card: Asset = {
        public_id: "",
        url: "",
        size: 0,
        format: ""
    }
    if (req.file) {
        const allowedFiles = ["image/png", "image/jpeg", "image/gif"];
        const storageLocation = `leads/cards`;
        if (!allowedFiles.includes(req.file.mimetype))
            return res.status(400).json({ message: `${req.file.originalname} is not valid, only ${allowedFiles} types are allowed to upload` })
        if (req.file.size > 200 * 1024)
            return res.status(400).json({ message: `${req.file.originalname} is too large limit is :200Kb` })

        const doc = await uploadFileToCloudinary(req.file.path, storageLocation)
        if (doc) {
            visiting_card = doc
        }
        else {
            return res.status(500).json({ message: "file uploading error" })
        }
    }
    const lead = new Lead({
        ...req.body,
        visiting_card: visiting_card,
        mobile: uniqueNumbers[0] || null,
        alternate_mobile1: uniqueNumbers[1] || null,
        alternate_mobile2: uniqueNumbers[2] || null,
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
    return res.status(200).json(lead)
}

// get all leads  anyone can do in the organization
export const GetLeads = async (req: Request, res: Response, next: NextFunction) => {
    let leads = await Lead.find().populate('lead_owners').populate('updated_by').populate('created_by').populate({
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
    const { mobile, remark, lead_owners, alternate_mobile1, alternate_mobile2 } = req.body as TLeadBody & { remark: string, lead_owners: string[] }
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
    
    let visiting_card = lead?.visiting_card;
    if (req.file) {
        const allowedFiles = ["image/png", "image/jpeg", "image/gif"];
        const storageLocation = `leads/cards`;
        if (!allowedFiles.includes(req.file.mimetype))
            return res.status(400).json({ message: `${req.file.originalname} is not valid, only ${allowedFiles} types are allowed to upload` })
        if (req.file.size > 200 * 1024)
            return res.status(400).json({ message: `${req.file.originalname} is too large limit is :200Kb` })

        const doc = await uploadFileToCloudinary(req.file.path, storageLocation)
        if (doc) {
            await destroyFile(lead.visiting_card?.public_id || "")
            visiting_card = visiting_card
        }
        else {
            return res.status(500).json({ message: "file uploading error" })
        }
    }

    lead = new Lead({
        ...req.body,
        mobile: uniqueNumbers[0] || null,
        alternate_mobile1: uniqueNumbers[1] || null,
        alternate_mobile2: uniqueNumbers[2] || null,
        lead_owners: new_lead_owners,
        visiting_card:visiting_card,
        created_by: req.user?._id,
        updated_by: req.user?._id,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
    })
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
            await lead.save()
        }
        let last_remark = lead.remarks[lead.remarks.length - 1]
        await Remark.findByIdAndUpdate(last_remark._id, {
            remark: remark,
            lead: lead,
            updated_at: new Date(),
            updated_by: req.user
        })
    }
    await lead.save()
    return res.status(200).json(lead)
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
        const allowedFiles = ["application/vnd.ms-excel", "text/csv"];
        if (!allowedFiles.includes(req.file.mimetype))
            return res.status(400).json({ message: `${req.file.originalname} is not valid, only excel and csv are allowed to upload` })
        if (req.file.size > 10 * 1024 * 1024)
            return res.status(400).json({ message: `${req.file.originalname} is too large limit is :10mb` })
        const workbook = xlsx.readFile(req.file.path);
        let workbook_sheet = workbook.SheetNames;
        let workbook_response: ILead[] = xlsx.utils.sheet_to_json(
            workbook.Sheets[workbook_sheet[0]]
        );
        return res.status(200).send({
            data: workbook_response,
        });
    }
    return res.status(404).send({
        message: "please provide an Excel file",
    });
}