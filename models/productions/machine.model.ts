import mongoose from "mongoose"
import { IMachine } from "../../types/productions/machine.types"

const MachineSchema = new mongoose.Schema<IMachine, mongoose.Model<IMachine, {}, {}>, {}>({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        lowercase: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
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
        default: new Date(new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        })),
        required: true,
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const Machine = mongoose.model<IMachine, mongoose.Model<IMachine, {}, {}>>("Machine", MachineSchema)