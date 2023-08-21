import mongoose from "mongoose"
import { IMessageTemplate } from "../../types/scheduler/scheduler.types"

const MessageTemplateSchema = new mongoose.Schema<IMessageTemplate, mongoose.Model<IMessageTemplate, {}, {}>, {}>({
    message: [
        {
            index: Number,
            messageTemplate: {
                type: String,
                required: true,
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

export const MessageTemplate = mongoose.model<IMessageTemplate, mongoose.Model<IMessageTemplate, {}, {}>>("MessageTemplate", MessageTemplateSchema)