import mongoose from "mongoose";
import { ILead } from "../types/lead.type";

const leadSchema = new mongoose.Schema<ILead, mongoose.Model<ILead>>({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        lowercase: true,
    },
    customer_name: {
        type: String,
        trim: true,
        lowercase: true,
    },
    customer_designation: {
        type: String,
        trim: true,
        lowercase: true,
    },
    mobile: {
        type: String,
        trim: true,
        index: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        index: true,
        lowercase: true
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
        lowercase: true
    },
    remarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Remark',
            required: true
        }
    ],
    work_description: {
        type: String,
        trim: true,
        lowercase: true
    },
    turnover: {
        type: String,
        trim: true,
        index: true,
    },
    lead_type: {
        type: String,
        trim: true,
        lowercase: true
    },
    stage: {
        type: String,
        trim: true,
        lowercase: true,
        default:"open"
    },
    alternate_mobile1: {
        type: String,
        trim: true,
    },
    alternate_mobile2: {
        type: String,
        trim: true,
    },
    alternate_email: {
        type: String,
        trim: true,
        lowercase: true,
    }
    ,
    lead_owners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    lead_source: {
        type: String,
        trim: true,
        lowercase: true,
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_by: {
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
    }
})
const Lead = mongoose.model<ILead, mongoose.Model<ILead>>("Lead", leadSchema);
export default Lead;