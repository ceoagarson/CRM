import mongoose from "mongoose";
import { IActivity } from "../types/activity.type";

const ActivitySchema = new mongoose.Schema<IActivity, mongoose.Model<IActivity>>({
    type: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
        , index: true
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
        type: mongoose.Schema.Types.ObjectId
    },
    resource_type: {
        type: String, required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    status_changed_by: {
        type: String,
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: new Date(Date.now())
    },
    updated_at: {
        type: Date,
        default: new Date(Date.now())
    },
})
export const Activity = mongoose.model<IActivity, mongoose.Model<IActivity>>("Activity", ActivitySchema)