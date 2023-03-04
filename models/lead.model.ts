import mongoose, { Types } from "mongoose";
import { ILead } from "../types/lead.type";

const leadSchema = new mongoose.Schema<ILead, mongoose.Model<ILead>>({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        lowercase: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        index: true,
        lowercase: true
    },
    mobile: {
        type: Number,
        trim: true,
        index: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,

    },

    city: {
        type: String,
        trim: true,
        lowercase: true
    },
    state: {
        type: String,
        trim: true,
        lowercase: true
    },
    // easy,medium,hard
    probability: {
        type: String,
        trim: true,
        lowercase: true
    },
    country: {
        type: String,
        trim: true,
        lowercase: true
    },
    lead_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    customer_name: {
        type: String,
        trim: true,
        lowercase: true,
    },

    dp: {
        public_id: { type: String },
        url: { type: String },
        size: { type: String },
        format: { type: String },
    }
    ,
    address: {
        type: String,
        trim: true,
        lowercase: true
    },

    alternate_mobile: {
        type: Number,
        trim: true,
    },

    alternate_email: {
        type: String,
        trim: true,
        lowercase: true,

    },
    customer_designation: {
        type: String,
        trim: true,
        lowercase: true,
    },
    lead_source: {
        type: String,
        trim: true,
        lowercase: true,
    },
    remarks: {
        type: String,
        trim: true,
        lowercase: true,
    },

    status: {
        type: Boolean,
        default: true,
        required: true,
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
        required: true,

    },
    updated_at: {
        type: Date,
        default: new Date(Date.now()),
        required: true,

    },
    activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    }]
})
const Lead = mongoose.model<ILead, mongoose.Model<ILead>>("Lead", leadSchema);
export default Lead;