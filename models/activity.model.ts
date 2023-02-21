import mongoose from "mongoose";
import { IActivity } from "../types/activity.type";

const ActivitySchema = new mongoose.Schema<IActivity, mongoose.Model<IActivity>>({
    activity_type: {
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
    resource_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    resource_type: {
        type: String, 
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    status_changed_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: new Date(Date.now()),
        required: true

    },
    updated_at: {
        type: Date,
        default: new Date(Date.now()),
        required: true

    },
})
export const Activity = mongoose.model<IActivity, mongoose.Model<IActivity>>("Activity", ActivitySchema)