import mongoose from "mongoose"
import { IBroadcast } from "../../types/broadcast/broadcast.type"

const BroadcastSchema = new mongoose.Schema<IBroadcast, mongoose.Model<IBroadcast, {}, {}>, {}>({
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IMessage'
    },
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IMessageTemplate'
    },
    key: {
        type: String,
        lowercase: true
    },
    cronString: {
        type: String
    },
    frequency: {
        type: String,
        frequency: String
    },
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'IBroadcastReport'
        }
    ],
    created_at: {
        type: Date,
        default: new Date(),
        required: true,

    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updated_at: {
        type: Date,
        default: new Date(),
        required: true,

    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const Broadcast = mongoose.model<IBroadcast, mongoose.Model<IBroadcast, {}, {}>>("Broadcast", BroadcastSchema)