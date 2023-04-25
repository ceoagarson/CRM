import mongoose from "mongoose"
import { IOrganization } from "../../types/users/organization.types"

const OrganizationSchema = new mongoose.Schema<IOrganization, mongoose.Model<IOrganization, {}, {}>, {}>({
    organization: {
        type: String,
        required: true,
        trim: true,
        index: true,
        lowercase: true,
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
    }
})

export const Organization = mongoose.model<IOrganization, mongoose.Model<IOrganization, {}, {}>>("Organization", OrganizationSchema)