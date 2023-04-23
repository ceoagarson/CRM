import mongoose from "mongoose"
import { IMachine } from "../types/machine.types"

const MachineSchema = new mongoose.Schema<IMachine, mongoose.Model<IMachine, {}, {}>, {}>({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        lowercase: true,
    },
    category: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
        required: true,
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

export const Machine = mongoose.model<IMachine, mongoose.Model<IMachine, {}, {}>>("Machine", MachineSchema)