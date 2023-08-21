import mongoose from "mongoose"
import { IBroadcastReport } from "../../types/broadcast/broadcast.type"

const BroadcastReportSchema = new mongoose.Schema<IBroadcastReport, mongoose.Model<IBroadcastReport, {}, {}>, {}>({
    customer_name: {
        type: String,
        lowercase: true
    },
    mobile: {
        type: String,
        required: true,
        lowercase: true
    },
    status: {
        type: String,
        lowercase: true,
        required: true
    },
    next_run_date: {
        type: Date,
    },
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

export const BroadcastReport = mongoose.model<IBroadcastReport, mongoose.Model<IBroadcastReport, {}, {}>>("BroadcastReport", BroadcastReportSchema)