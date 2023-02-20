import { NextFunction, Request, Response } from "express"
import isEmail from "validator/lib/isEmail"
import isMongoId from "validator/lib/isMongoId"
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.ts"
import Lead from "../models/lead.model"
import { User } from "../models/user.model"
import { Asset } from "../types/asset.type"
import { ILead, TLeadBody } from "../types/lead.type"
import { uploadFileToCloudinary } from "../utils/uploadFile.util"

// create lead any one can do in the organization
export const CreateLead = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, mobile, email } = req.body as TLeadBody
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(404).json({ message: "please login to access this resource" })
    // validations
    if (!name || !email || !mobile)
        return res.status(400).json({ message: "fill all the required fields" });
    if (!isEmail(email))
        return res.status(403).json({ message: "please provide valid email" });
    if ((String(mobile).trim().length !== 10))
        return res.status(403).json({ message: "please provide valid mobile number" });
    if (await Lead.findOne({ name: name.toLowerCase().trim() }))
        return res.status(403).json({ message: `${name} already exists` });

    if (await Lead.findOne({ email: email.toLowerCase().trim() }))
        return res.status(403).json({ message: `${email} already exists` });
    if (await Lead.findOne({ mobile: String(mobile).trim() }))
        return res.status(403).json({ message: `${mobile} already exists` });

    let dp: Asset = {
        public_id: "",
        url: "",
        size: 0,
        format: ""
    }
    if (req.file) {
        const allowedFiles = ["image/png", "image/jpeg", "image/gif"];
        const storageLocation = `crm/users/dp`;
        if (!allowedFiles.includes(req.file.mimetype))
            return res.status(400).json({ message: `${req.file.originalname} is not valid, only ${allowedFiles} types are allowed to upload` })
        if (req.file.size > 200 * 1024)
            return res.status(400).json({ message: `${req.file.originalname} is too large limit is :200Kb` })
        const doc = await uploadFileToCloudinary(req.file.path, storageLocation)
        if (doc)
            dp = doc
        else {
            return res.status(500).json({ message: "file uploading error" })
        }
    }
    const lead = await new Lead({
        ...req.body,
        dp,
        organization: user.organization,
        lead_owner: user._id,
        createdBy: user._id,
        updatedBy: user._id,
        open: {
            status: true,
            changedBy: user.username
        }
        
    }).save()
    res.status(200).json({ lead })
})
// update lead only admin can do
export const UpdateLead = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, mobile, email } = req.body as TLeadBody

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
    if (!name || !email || !mobile)
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
            console.log(mobile,lead.mobile)
    if (mobile !=lead.mobile)
        if (await Lead.findOne({ mobile: String(mobile).trim(), organization: lead.organization?._id }))
            return res.status(403).json({ message: `${mobile} already exists` });

    let dp: Asset = {
        public_id: "",
        url: "",
        size: 0,
        format: ""
    }

    if (req.file) {
        const allowedFiles = ["image/png", "image/jpeg", "image/gif"];
        const storageLocation = `crm/leads/dp`;
        if (!allowedFiles.includes(req.file.mimetype))
            return res.status(400).json({ message: `${req.file.originalname} is not valid, only ${allowedFiles} types are allowed to upload` })
        if (req.file.size > 200 * 1024)
            return res.status(400).json({ message: `${req.file.originalname} is too large limit is :200Kb` })
        const doc = await uploadFileToCloudinary(req.file.path, storageLocation)
        if (doc)
            dp = doc
        else {
            return res.status(500).json({ message: "file uploading error" })
        }
    }
    await Lead.findByIdAndUpdate(lead._id, {
        ...req.body,
        dp,
        organization: user.organization,
        lead_owner: user._id,
        createdBy: user._id,
        updatedBy: user._id
    }).then(() =>
        res.status(200).json({ message: "lead updated" })
    )
})
//toogle lead status only admin can do "open",/"close"
export const ToogleLeadStatus = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(403).json({ message: "please login to access this resource" })
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "lead id not valid" })
    let lead = await Lead.findById(id);
    if (!lead) {
        return res.status(404).json({ message: "lead not found" })
    }

    await Lead.findByIdAndUpdate(lead._id, {
        open: {
            status: !lead.open?.status,
            changedBy: user.username
        }
    }).then(() => res.status(200).json({ message: "lead status updated" }))
})

// Delete lead
export const DeleteLead = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "lead id not valid" })
    let lead = await Lead.findById(id);
    if (!lead) {
        return res.status(404).json({ message: "lead not found" })
    }
    await lead.remove()
    res.status(200).json({ message: "lead deleted permanently" })
})
// get a lead anyone can do in the organization
export const GetLead = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "lead id not valid" })
    let lead = await Lead.findById(id).populate('lead_owner').populate('organization').populate('activities').populate('createdBy').populate('updatedBy')
    if (!lead) {
        return res.status(404).json({ message: "lead not found" })
    }
    return res.status(200).json(lead)
})
// get all leads  anyone can do in the organization
export const GetLeads = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let leads = await Lead.find({ organization: req.user?.organization }).populate('lead_owner').populate('organization').populate('activities').populate('createdBy').populate('updatedBy')
    if (!leads) {
        return res.status(404).json({ message: "leads not found" })
    }
    return res.status(200).json(leads)
})

// filter leads anyone can do in the organization
export const FilterLeads = catchAsyncError(async (req, res, next) => {
    let filter = [];
    if (req.query.city)
        filter.push({ city: { $regex: req.query.city } });
    if (req.query.state) filter.push({ state: { $regex: req.query.state } });
    if (req.query.state) filter.push({ state: { $regex: req.query.state } });
    if (req.query.country) filter.push({ country: { $regex: req.query.country } });
    if (req.query.lead_owner) filter.push({ lead_owner: { $regex: req.query.lead_owner } });
    if (req.query.organization) filter.push({ organization: { $regex: req.query.organization } });
    if (req.query.lead_source) filter.push({ lead_source: { $regex: req.query.lead_source } });
    if (req.query.open) filter.push({ open: { $regex: req.query.open } });
    if (req.query.createdOn) filter.push({ createdOn: { $regex: req.query.createdOn } });
    if (filter.length < 1)
        return res.status(400).json({ message: "no filter provided" })

    const leads = await Lead.find({
        $and: filter,
    }).sort({ createdAt: -1 });
    if (leads.length > 0)
        return res.status(200).json(leads);
    else
        return res.status(404).json({ message: "leads not found" })
});

// fuzzy search leads anyone can do in the organization
export const FuzzySearchLeads = catchAsyncError(async (req, res, next) => {
    const key = String(req.params.query);
    const leads = await Lead.find({
        $or: [
            { name: { $regex: key } },
            { email: { $regex: key } },
            { mobile: { $regex: key } },
            { city: { $regex: key } },
            { state: { $regex: key } },
            { description: { $regex: key } },
            { lead_type: { $regex: key } },
            { lead_owner: { $regex: key } },
            { customer_name: { $regex: key } },
            { address: { $regex: key } },
            { country: { $regex: key } },
            { alternate_mobile: { $regex: key } },
            { alternate_email: { $regex: key } },
            { customer_designination: { $regex: key } },
            { lead_source: { $regex: key } },
            { remarks: { $regex: key } },
            { createdOn: { $regex: key } }
        ],
    }).sort({ createdAt: -1 });
    if (leads.length > 0) res.status(200).json({ leads });
    else return res.status(404).json({ message: "user not found" });
});