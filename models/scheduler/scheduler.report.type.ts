import mongoose from "mongoose"
import { ISchedulerReport } from "../../types/scheduler/scheduler.types"

const SchedulerReportSchema = new mongoose.Schema<ISchedulerReport, mongoose.Model<ISchedulerReport, {}, {}>, {}>({
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

export const SchedulerReport = mongoose.model<ISchedulerReport, mongoose.Model<ISchedulerReport, {}, {}>>("SchedulerReport", SchedulerReportSchema)