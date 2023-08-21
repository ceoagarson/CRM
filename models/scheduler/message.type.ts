import mongoose from "mongoose"
import { IMessage } from "../../types/scheduler/scheduler.types"

const MessageSchema = new mongoose.Schema<IMessage, mongoose.Model<IMessage, {}, {}>, {}>({
    message: [
        {
            index: Number,
            message: {
                type: String,
                trim: true,
                index: true
            }
        }
    ],
    media: [
        {
            index: Number,
            media: {
                public_id: { type: String },
                url: { type: String },
                size: { type: String },
                format: { type: String },
            }
        }
    ],
    media_with_captain: [
        {
            index: Number,
            media: {
                public_id: { type: String },
                url: { type: String },
                size: { type: String },
                format: { type: String },
            },
            caption: String
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

export const Message = mongoose.model<IMessage, mongoose.Model<IMessage, {}, {}>>("Message", MessageSchema)