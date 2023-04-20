import mongoose from "mongoose";
import crypto from "crypto";
import { IOrganization, IOrganizationMethods } from "../types/organization.type";

const OrganizationSchema = new mongoose.Schema<IOrganization, mongoose.Model<IOrganization, {}, IOrganizationMethods>, {}, IOrganizationMethods>({
    organization_name: {
        type: String,
        index: true,
        lowercase: true,
        required: true,
        trim: true
    },
    organization_email: {
        type: String,
        index: true,
        required: true,
        trim: true,
        lowercase: true
    },
    organization_mobile: {
        type: String,
        trim: true,
        index: true,
        required: true,
    },
    organization_dp: {
        type: {
            public_id: "",
            url: "",
            size: 0,
            format: ""
        }
    },
    address: {
        type: String,
        trim: true,
        lowercase: true
    },
    country: {
        type: String,
        trim: true,
        lowercase: true
    },
    email_verified: {
        type: Boolean,
        default: false,
    },
    owner:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'IUser',
            required: true
        },
    is_active: {
        type: Boolean,
        default: true,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date(Date.now()),
        required: true,

    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updated_at: {
        type: Date,
        default: new Date(Date.now()),
        required: true,

    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    emailVerifyToken: {
        type: String,
        default: null
    },
    emailVerifyExpire: {
        type: Date,
        default: null
    },
})

//generating email verification token
OrganizationSchema.method("getEmailVerifyToken", function () {
    const emailToken = crypto.randomBytes(32).toString('hex');
    this.emailVerifyToken = emailToken
    this.emailVerifyExpire = new Date(Date.now() + 15 * 60 * 1000);
    return emailToken;
})
// exporting model
export const Organization = mongoose.model<IOrganization, mongoose.Model<IOrganization, {}, IOrganizationMethods>>("Organization", OrganizationSchema)