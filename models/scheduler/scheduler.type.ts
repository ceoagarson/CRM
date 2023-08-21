import mongoose from "mongoose"
import { IScheduler } from "../../types/scheduler/scheduler.types"

const SchedulerSchema = new mongoose.Schema<IScheduler, mongoose.Model<IScheduler, {}, {}>, {}>({
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IMessage',
        required: true
    },
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IMessageTemplate',
        required: true
    },
    key: {
        type: String,
        required: true,
        lowercase: true
    },
    cronString: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        frequency: String
    },
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ISchedulerReport',
            required: true
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

export const Scheduler = mongoose.model<IScheduler, mongoose.Model<IScheduler, {}, {}>>("Scheduler", SchedulerSchema)