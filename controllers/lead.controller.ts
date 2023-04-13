import { NextFunction, Request, Response } from "express"
import isEmail from "validator/lib/isEmail"
import isMongoId from "validator/lib/isMongoId"
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.ts"
import Lead from "../models/lead.model"
import { User } from "../models/user.model"
import { TLeadBody } from "../types/lead.type"
import { Remark } from "../models/remark.model.js"

// create lead any one can do in the organization
export const CreateLead = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, mobile, email, work_description, remark } = req.body as TLeadBody & { remark: string }
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(404).json({ message: "please login to access this resource" })
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

    const lead = new Lead({
        ...req.body,
        organization: user.organization._id,
        lead_owner: user._id,
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
    let savedlead = await Lead.findById(lead._id).populate('lead_owner').populate('organization').populate('updated_by').populate('created_by').populate('remarks')
    if (!lead) {
        return res.status(404).json({ message: "lead not found" })
    }
    return res.status(200).json(savedlead)
})
// get a lead anyone can do in the organization
export const GetLead = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "lead id not valid" })
    let lead = await Lead.findById(id).populate('lead_owner').populate('organization').populate('updated_by').populate('created_by').populate('remarks')
    if (!lead) {
        return res.status(404).json({ message: "lead not found" })
    }
    return res.status(200).json(lead)
})
// get all leads  anyone can do in the organization
export const GetLeads = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let leads = await Lead.find({ organization: req.user?.organization }).populate('lead_owner').populate('organization').populate('updated_by').populate('created_by').populate('remarks')
    if (!leads) {
        return res.status(404).json({ message: "leads not found" })
    }
    return res.status(200).json(leads)
})
// update lead only admin can do
export const UpdateLead = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, mobile, email, work_description, remark } = req.body as TLeadBody & { remark: string }
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(403).json({ message: "please login to access this resource" })
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

    if (remark) {
        let last_remark = lead.remarks[lead.remarks.length - 1]
        await Remark.findByIdAndUpdate(last_remark._id, {
            remark,
            lead: lead,
            updated_at: new Date(Date.now()),
            updated_by: req.user
        })
    }
    await Lead.findByIdAndUpdate(lead._id, {
        ...req.body,
        organization: user.organization,
        updated_at: new Date(Date.now()),
        updated_by: user._id
    }).then(() =>
        res.status(200).json({ message: "lead updated" })
    )
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

// filter leads anyone can do in the organization
// export const FilterLeads = catchAsyncError(async (req, res, next) => {
//     let filter = [];
//     if (req.query.city)
//         filter.push({ city: { $regex: req.query.city } });
//     if (req.query.state) filter.push({ state: { $regex: req.query.state } });
//     if (req.query.country) filter.push({ country: { $regex: req.query.country } });
//     if (req.query.lead_owner) filter.push({ lead_owner: { $regex: req.query.lead_owner } });
//     if (req.query.organization) filter.push({ organization: { $regex: req.query.organization } });
//     if (req.query.lead_source) filter.push({ lead_source: { $regex: req.query.lead_source } });
//     console.log(filter)
//     if (filter.length < 1)
//         return res.status(400).json({ message: "no filter provided" })
//     const leads = await Lead.find({
//         $and: filter,
//     }).sort({ created_at: -1 });
//     if (leads.length > 0)
//         return res.status(200).json(leads);
//     else
//         return res.status(404).json({ message: "leads not found" })
// });

// // fuzzy search leads anyone can do in the organization
// export const FuzzySearchLeads = catchAsyncError(async (req, res, next) => {
//     const key = String(req.params.query);
//     const leads = await Lead.find({
//         $or: [
//             { name: { $regex: key } },
//             { email: { $regex: key } },
//             { mobile: { $regex: key } },
//             { city: { $regex: key } },
//             { state: { $regex: key } },
//             { work_description: { $regex: key } },
//             { lead_type: { $regex: key } },
//             { lead_owner: { $regex: key } },
//             { customer_name: { $regex: key } },
//             { address: { $regex: key } },
//             { country: { $regex: key } },
//             { alternate_mobile: { $regex: key } },
//             { alternate_email: { $regex: key } },
//             { customer_designination: { $regex: key } },
//             { lead_source: { $regex: key } },
//             { remarks: { $regex: key } },
//             { createdOn: { $regex: key } }
//         ],
//     }).sort({ createdAt: -1 });
//     if (leads.length > 0) res.status(200).json({ leads });
//     else return res.status(404).json({ message: "user not found" });
// });