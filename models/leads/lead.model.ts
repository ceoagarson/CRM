import mongoose from "mongoose";
import { ILead } from "../../types/crm/lead.type";

const leadSchema = new mongoose.Schema<ILead, mongoose.Model<ILead>>({
    name: {
        type: String,
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
        index: true,
        lowercase: true
    },
    city: {
        type: String,
        trim: true,
        lowercase: true,
    },
    state: {
        type: String,
        trim: true,
        lowercase: true,
    },
    country: {
        type: String,
        trim: true,
        lowercase: true,
    },
    address: {
        type: String,
        trim: true,
        lowercase: true
    },
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
        default: "open"
    },
    lead_source: {
        type: String,
        trim: true,
        lowercase: true,
    },
    remarks: {
        last_remark: String,
        remarks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Remark'
        }]
    },
    lead_owners: [{
        username: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }],
    visiting_card: {
        public_id: { type: String },
        url: { type: String },
        size: { type: String },
        format: { type: String },
    },
    is_customer: {
        type: Boolean,
        default: false,
        required: true,
    },
    last_whatsapp_date: {
        type: Date
    },
    updated_by: {
        username: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    created_by: {
        username: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    created_at: {
        type: Date,
        default: new Date(),
        required: true,
    },
    updated_at: {
        type: Date,
        default: new Date(),
        required: true,
    }
})
leadSchema.index({ '$**': 'text' })
const Lead = mongoose.model<ILead, mongoose.Model<ILead>>("Lead", leadSchema);
export default Lead;