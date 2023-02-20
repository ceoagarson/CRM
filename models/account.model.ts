import mongoose, { Types } from "mongoose";
import { IAccount } from "../types/account.type";

const accountSchema = new mongoose.Schema<IAccount, mongoose.Model<IAccount>>({
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
    account_owner: {
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
        default: 0
    },

    alternate_email: {
        type: String,
        trim: true,
        lowercase: true,

    },
    customer_designination: {
        type: String,
        trim: true,
        lowercase: true,
    },
    account_source: {
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
        default: true
    },
    status_changed_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    }]
})
const Account = mongoose.model<IAccount, mongoose.Model<IAccount>>("Account", accountSchema);
export default Account;