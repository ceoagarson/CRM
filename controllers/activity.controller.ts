
import { NextFunction, Request, Response } from "express"
import { Document } from "mongoose"
import isMongoId from "validator/lib/isMongoId"
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.ts"
import Account from "../models/account.model"
import { Activity } from "../models/activity.model"
import Lead from "../models/lead.model"
import Opportunity from "../models/opportunity.model"
import { User } from "../models/user.model"
import { TActivityBody } from "../types/activity.type"

// create activity any one can do in the organization
export const CreateActivity = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { type, description, remarks, resource_type } = req.body as TActivityBody & { resource_type: "lead" | "opportunity" | "account" }
    // let Resource: Document|undefined|null= undefined
    // validations
    if (!type || !description || !remarks || !resource_type)
        return res.status(400).json({ message: "fill all the required fields" });
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "activity id not valid" })
    if (resource_type == "lead") {
        var Resource = await Lead.findById(id)
        if (!Resource)
            return res.status(404).json({ message: `${resource_type} resource not found` })
    }
    else if (resource_type === "account") {
        Resource = await Account.findById(id)
        if (!Resource)
            return res.status(404).json({ message: `${resource_type} resource not found` })

    }
    else if (resource_type === "opportunity") {
        Resource = await Opportunity.findById(id)
        if (!Resource)
            return res.status(404).json({ message: `${resource_type} resource not found` })
    }
    else {
        return res.status(404).json({ message: ` ${resource_type} resource not found` })
    }
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(403).json({ message: "please login to access this resource" })

    const activity = await new Activity({
        ...req.body,
        organization: user.organization,
        activity_owner: user._id,
        resource: {
            id: id,
            type: resource_type
        },
    }).save()
    Resource?.activities?.push(activity)
    await Resource?.save()
    res.status(200).json(activity)
})
// update activity only admin can do
export const UpdateActivity = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { type, description, remarks } = req.body as TActivityBody
    // validations
    if (!type || !description || !remarks)
        return res.status(400).json({ message: "fill all the required fields" });
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "activity id not valid" })
    let activity = await Activity.findById(id)
    if (!activity) return res.status(404).json({ message: "activity not found" })
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(403).json({ message: "please login to access this resource" })
    await Activity.findByIdAndUpdate(id, {
        ...req.body,
        organization: user.organization,
        activity_owner: user._id
    }).then(() => res.status(200).json({ message: "activity updated" }))
})
//toogle activity status only admin can do "open",/"close"
export const ToogleActivityStatus = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(403).json({ message: "please login to access this resource" })
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "activity id not valid" })
    let activity = await Activity.findById(id);
    if (!activity) {
        return res.status(404).json({ message: "activity not found" })
    }
    await Activity.findOneAndUpdate(activity._id, {
        open: {
            status: !activity.open?.status,
            changedBy: user._id
        }
    }).then(() => res.status(200).json({ message: "activity status updated" }))
})
// delete activity
export const DeleteActivity = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(403).json({ message: "please login to access this resource" })
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "activity id not valid" })
    let activity = await Activity.findById(id);
    if (!activity) {
        return res.status(404).json({ message: "activity not found" })
    }
    if (activity.resource.type === "lead") {
        var Resource = await Lead.findById(activity.resource.id)
        if (!Resource)
            return res.status(404).json({ message: `${activity.resource.type} resource not found` })
    }
    else if (activity.resource.type === "account") {
        Resource = await Account.findById(activity.resource.id)
        if (!Resource)
            return res.status(404).json({ message: `${activity.resource.type} resource not found` })
    }
    else if (activity.resource.type === "opportunity") {
        Resource = await Opportunity.findById(activity.resource.id)
        if (!Resource)
            return res.status(404).json({ message: `${activity.resource.type} resource not found` })
    }
    else {
        return res.status(404).json({ message: ` ${activity.resource.type} resource not found` })
    }
    Resource.activities = Resource.activities?.filter((item) => {
        return (item._id.toString() !== activity?._id.toString())
    })
    await Resource.save()
    await activity.remove()
    res.status(200).json({ message: "activity deleted permanently" })
})
// get a activity anyone can do in the organization
export const GetActivity = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "activity id not valid" })
    let activity = await Activity.findById(id);
    if (!activity) {
        return res.status(404).json({ message: "activity not found" })
    }
    return res.status(200).json(activity)
})
// get all activities  anyone can do in the organization
export const GetActivities = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let activities = await Activity.find();
    if (!activities) {
        return res.status(404).json({ message: "activities not found" })
    }
    return res.status(200).json(activities)
})
// filter activities anyone can do in the organization
export const FilterActivities = catchAsyncError(async (req, res, next) => {
    let filter = [];
    if (req.query.activity_owner)
        filter.push({ activity_owner: { $regex: req.query.activity_owner } });
    if (req.query.createdOn) filter.push({ state: { $regex: req.query.state } });
    if (req.query.type) filter.push({ type: { $regex: req.query.type } });
    if (req.query.createdOn) filter.push({ createdOn: { $regex: req.query.createdOn } });
    if (filter.length < 1)
        return res.status(400).json({ message: "no filter provided" })

    const activities = await Activity.find({
        $and: filter,
    }).sort({ createdAt: -1 });
    if (activities.length > 0)
        return res.status(200).json(activities);
    else
        return res.status(404).json({ message: "activities not found" })
});

// fuzzy search activities anyone can do in the organization
export const FuzzySearchActivities = catchAsyncError(async (req, res, next) => {
    const key = String(req.params.query);
    const activities = await Activity.find({
        $or: [
            { activity_owner: { $regex: key } },
            { type: { $regex: key } },
            { _id: { $regex: key } },
            { createdOn: { $regex: key } },
            { description: { $regex: key } },
            { remarks: { $regex: key } },
            { resource: { $regex: key } }
        ],
    }).sort({ createdAt: -1 });
    if (activities.length > 0) res.status(200).json({ activities });
    else return res.status(404).json({ message: "user not found" });
});