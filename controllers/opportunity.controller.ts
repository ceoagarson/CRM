import { NextFunction, Request, Response } from "express"
import isEmail from "validator/lib/isEmail"
import isMongoId from "validator/lib/isMongoId"
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.ts"
import Opportunity from "../models/opportunity.model"
import { User } from "../models/user.model"
import { Asset } from "../types/asset.type"
import { TOpportunityBody } from "../types/opportunity.types"
import { uploadFileToCloudinary } from "../utils/uploadFile.util"
// create opportunity any one can do in the organization
export const CreateOpportunity = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, mobile, email } = req.body as TOpportunityBody
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(403).json({ message: "please login to access this resource" })
    // validations
    if (!name || !email || !mobile)
        return res.status(400).json({ message: "fill all the required fields" });
    if (!isEmail(email))
        return res.status(403).json({ message: "please provide valid email" });
    if ((String(mobile).trim().length !== 10))
        return res.status(403).json({ message: "please provide valid mobile number" });
    if (await Opportunity.findOne({ name: name.toLowerCase().trim() }))
        return res.status(403).json({ message: `${name} already exists` });

    if (await Opportunity.findOne({ email: email.toLowerCase().trim() }))
        return res.status(403).json({ message: `${email} already exists` });
    if (await Opportunity.findOne({ mobile: String(mobile).trim() }))
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
    const opportunity = await new Opportunity({
        ...req.body,
        dp,
        organization: user.organization,
        opportunity_owner: user._id,
    }).save()
    res.status(200).json({ opportunity })
})
// update opportunity only admin can do
export const UpdateOpportunity = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, mobile, email } = req.body as TOpportunityBody

    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(403).json({ message: "please login to access this resource" })
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(400).json({ message: "opportunity id not valid" })
    let opportunity = await Opportunity.findById(id);
    if (!opportunity) {
        return res.status(404).json({ message: "opportunity not found" })
    }
    // validations
    if (!name || !email || !mobile)
        return res.status(400).json({ message: "fill all the required fields" });
    if (!isEmail(email))
        return res.status(403).json({ message: "please provide valid email" });
    if ((String(mobile).trim().length !== 10))
        return res.status(403).json({ message: "please provide valid mobile number" });
    if (name !== opportunity.name)
        if (await Opportunity.findOne({ name: name.toLowerCase().trim() }))
            return res.status(403).json({ message: `${name} already exists` });
    if (email !== opportunity.email)
        if (await Opportunity.findOne({ email: email.toLowerCase().trim() }))
            return res.status(403).json({ message: `${email} already exists` });
    if (mobile !== opportunity.mobile)
        if (await Opportunity.findOne({ mobile: String(mobile).trim() }))
            return res.status(403).json({ message: `${mobile} already exists` });

    let dp: Asset = {
        public_id: "",
        url: "",
        size: 0,
        format: ""
    }

    if (req.file) {
        const allowedFiles = ["image/png", "image/jpeg", "image/gif"];
        const storageLocation = `crm/opportunities/dp`;
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
    await Opportunity.findByIdAndUpdate(opportunity._id, {
        ...req.body,
        dp,
        organization: user.organization,
        opportunity_owner: user._id,
    }).then(() =>
        res.status(200).json({ message: "opportunity updated" })
    )
})
//toogle opportunity status only admin can do "open",/"close"
export const ToogleOpportunityStatus = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(403).json({ message: "please login to access this resource" })
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "opportunity id not valid" })
    let opportunity = await Opportunity.findById(id);
    if (!opportunity) {
        return res.status(404).json({ message: "opportunity not found" })
    }

    await Opportunity.findByIdAndUpdate(opportunity._id, {
        open: {
            status: !opportunity.open?.status,
            changedBy: user._id
        }
    }).then(() => res.status(200).json({ message: "opportunity status updated" }))
})

// Delete opportunity
export const DeleteOpportunity = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "opportunity id not valid" })
    let opportunity = await Opportunity.findById(id);
    if (!opportunity) {
        return res.status(404).json({ message: "opportunity not found" })
    }
    await opportunity.remove()
    res.status(200).json({ message: "opportunity deleted permanently" })
})
// get a opportunity anyone can do in the organization
export const GetOpportunity = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "opportunity id not valid" })
    let opportunity = await Opportunity.findById(id).populate('opportunity_owner').populate('organization').populate('activities')
    if (!opportunity) {
        return res.status(404).json({ message: "opportunity not found" })
    }
    return res.status(200).json(opportunity)
})
// get all opportunities  anyone can do in the organization
export const GetOpportunities = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let opportunities = await Opportunity.find().populate('opportunity_owner').populate('organization').populate('activities')
    if (!opportunities) {
        return res.status(404).json({ message: "opportunities not found" })
    }
    return res.status(200).json(opportunities)
})

// filter opportunities anyone can do in the organization
export const FilterOpportunities = catchAsyncError(async (req, res, next) => {
    let filter = [];
    if (req.query.city)
        filter.push({ city: { $regex: req.query.city } });
    if (req.query.state) filter.push({ state: { $regex: req.query.state } });
    if (req.query.state) filter.push({ state: { $regex: req.query.state } });
    if (req.query.country) filter.push({ country: { $regex: req.query.country } });
    if (req.query.opportunity_owner) filter.push({ opportunity_owner: { $regex: req.query.opportunity_owner } });
    if (req.query.organization) filter.push({ organization: { $regex: req.query.organization } });
    if (req.query.opportunity_source) filter.push({ opportunity_source: { $regex: req.query.opportunity_source } });
    if (req.query.open) filter.push({ open: { $regex: req.query.open } });
    if (req.query.createdOn) filter.push({ createdOn: { $regex: req.query.createdOn } });
    if (filter.length < 1)
        return res.status(400).json({ message: "no filter provided" })

    const opportunities = await Opportunity.find({
        $and: filter,
    }).sort({ createdAt: -1 });
    if (opportunities.length > 0)
        return res.status(200).json(opportunities);
    else
        return res.status(404).json({ message: "opportunities not found" })
});

// fuzzy search opportunities anyone can do in the organization
export const FuzzySearchOpportunities = catchAsyncError(async (req, res, next) => {
    const key = String(req.params.query);
    const opportunities = await Opportunity.find({
        $or: [
            { name: { $regex: key } },
            { email: { $regex: key } },
            { mobile: { $regex: key } },
            { city: { $regex: key } },
            { state: { $regex: key } },
            { description: { $regex: key } },
            { opportunity_type: { $regex: key } },
            { opportunity_owner: { $regex: key } },
            { customer_name: { $regex: key } },
            { address: { $regex: key } },
            { country: { $regex: key } },
            { alternate_mobile: { $regex: key } },
            { alternate_email: { $regex: key } },
            { customer_designination: { $regex: key } },
            { opportunity_source: { $regex: key } },
            { remarks: { $regex: key } },
            { createdOn: { $regex: key } }
        ],
    }).sort({ createdAt: -1 });
    if (opportunities.length > 0) res.status(200).json({ opportunities });
    else return res.status(404).json({ message: "user not found" });
});