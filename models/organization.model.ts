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
    organization_dp: {
        type: {
            public_id: "",
            url: "",
            size: 0,
            format: ""
        }
    },
    email_verified: {
        type: Boolean,
        default: false,
    },
    owners:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Owner',
            required: true
        }
    ],
    is_active: { type: Boolean, default: true },
    createdAt: { type: Date, default: new Date(Date.now()) },
    emailVerifyToken: String,
    emailVerifyExpire: { type: Date, default: undefined },
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