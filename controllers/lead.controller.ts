import { NextFunction, Request, Response } from "express"
import isEmail from "validator/lib/isEmail"
import isMongoId from "validator/lib/isMongoId"
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.ts"
import Lead from "../models/lead.model"
import { User } from "../models/user.model"
import { TLeadBody } from "../types/lead.type"
import { Remark } from "../models/remark.model.js"
import { IUser } from "../types/user.type.js"

// create lead any one can do in the organization
export const CreateLead = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, mobile, email, work_description, remark, lead_owners } = req.body as TLeadBody & { remark: string, lead_owners: string[] }
    if (!lead_owners)
        return res.status(400).json({ message: "assign at least one lead owner" });
    if (lead_owners.length < 1)
        return res.status(400).json({ message: "assign at least one lead owner" });
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(400).json({ message: "please login to access this resource" })
    // validations
    if (!name || !email || !mobile || !work_description)
        return res.status(400).json({ message: "fill all the required fields" });
    if (!isEmail(email))
        return res.status(403).json({ message: "please provide valid email" });
    if ((String(mobile).trim().length !== 10))
        return res.status(403).json({ message: "please provide valid mobile number" });
    if (await Lead.findOne({ name: name.toLowerCase().trim() }))
        return res.status(403).json({ message: `${name} already exists` });

    if (await Lead.findOne({ email: email.toLowerCase().trim() }))
        return res.status(403).json({ message: `${email} already exists` });
    if (await Lead.findOne({ mobile: String(mobile).trim(), alternate_mobile1: String(mobile).trim(), alternate_mobile2: String(mobile).trim() }))
        return res.status(403).json({ message: `${mobile} already exists` });

    let new_lead_owners: IUser[] = []
    for (let i = 0; i < lead_owners.length; i++) {
        let owner = await User.findById(lead_owners[i])
        if (owner)
            new_lead_owners.push(owner)
    }
    const lead = new Lead({
        ...req.body,
        organization: user.organization._id,
        lead_owners: new_lead_owners,
        created_by: user._id,
        updated_by: user._id,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
    })
    if (remark) {
        let new_remark = new Remark({
            remark,
            lead: lead,
            created_at: new Date(Date.now()),
            created_by: req.user,
            updated_at: new Date(Date.now()),
            updated_by: req.user
        })
        await new_remark.save()
        lead.remarks = [new_remark]
    }
    await lead.save()
    return res.status(200).json({ message: "lead created" })
})
// get a lead anyone can do in the organization
export const GetLead = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "lead id not valid" })
    let lead = await Lead.findById(id).populate('lead_owners').populate('organization').populate('updated_by').populate('created_by').populate({
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
    if (!lead) {
        return res.status(404).json({ message: "lead not found" })
    }
    return res.status(200).json(lead)
})
// get all leads  anyone can do in the organization
export const GetLeads = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let leads = await Lead.find({ organization: req.user?.organization }).populate('lead_owners').populate('organization').populate('updated_by').populate('created_by').populate({
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
})
// update lead only admin can do
export const UpdateLead = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, mobile, email, work_description, remark, lead_owners } = req.body as TLeadBody & { remark: string, lead_owners: string[] }
    if (!lead_owners)
        return res.status(400).json({ message: "assign at least one lead owner" });
    if (lead_owners.length < 1)
        return res.status(400).json({ message: "assign at least one lead owner" });
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(400).json({ message: "please login to access this resource" })

    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "lead id not valid" })
    let lead = await Lead.findById(id);
    if (!lead) {
        return res.status(404).json({ message: "lead not found" })
    }
    // validations
    if (!name || !email || !mobile || !work_description)
        return res.status(400).json({ message: "fill all the required fields" });
    if (!isEmail(email))
        return res.status(403).json({ message: "please provide valid email" });
    if ((String(mobile).trim().length !== 10))
        return res.status(403).json({ message: "please provide valid mobile number" });
    if (name !== lead.name)
        if (await Lead.findOne({ name: name.toLowerCase().trim(), organization: lead.organization?._id }))
            return res.status(403).json({ message: `${name} already exists` });
    if (email !== lead.email)
        if (await Lead.findOne({ email: email.toLowerCase().trim(), organization: lead.organization?._id }))
            return res.status(403).json({ message: `${email} already exists` });
    console.log(mobile, lead.mobile)
    if (mobile != lead.mobile)
        if (await Lead.findOne({ mobile: String(mobile).trim(), organization: lead.organization?._id }))
            return res.status(403).json({ message: `${mobile} already exists` });
    let new_lead_owners: IUser[] = []
    for (let i = 0; i < lead_owners.length; i++) {
        let owner = await User.findById(lead_owners[i])
        if (owner)
            new_lead_owners.push(owner)

        if (remark) {
            if(!lead.remarks.length){
                let new_remark = new Remark({
                    remark,
                    lead: lead,
                    created_at: new Date(Date.now()),
                    created_by: user,
                    updated_at: new Date(Date.now()),
                    updated_by: user
                })
                await new_remark.save()
                lead.remarks = [new_remark]
                await lead.save()
            }
            let last_remark = lead.remarks[lead.remarks.length - 1]
            await Remark.findByIdAndUpdate(last_remark._id,{
                remark :remark,
                lead :lead,
                updated_at :new Date(Date.now()),
                updated_by :user,
            })
        }
    }
    await Lead.findByIdAndUpdate(lead._id, {
        ...req.body,
        lead_owners: new_lead_owners,
        organization: user.organization,
        updated_at: new Date(Date.now()),
        updated_by: user._id
    })
    return res.status(200).json({ message: "lead updated" })
})


// add new remarks on lead
export const NewRemark = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
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
})
