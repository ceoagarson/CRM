import mongoose from "mongoose";
import { IActivity } from "../types/activity.type";

const ActivitySchema = new mongoose.Schema<IActivity, mongoose.Model<IActivity>>({
    type: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
        ,index: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    remarks: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    activity_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    resource: {
        id: { type: mongoose.Schema.Types.ObjectId },
        type: { type: String,required:true }
    },
    open: {
        status: {
            type: Boolean,
            default: true
        },
        changedBy: {
            type: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        },
    },
    createdOn: { type: Date, default: new Date(Date.now()) }
})
export const Activity = mongoose.model<IActivity, mongoose.Model<IActivity>>("Activity", ActivitySchema)