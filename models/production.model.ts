import mongoose from "mongoose"
import { IProduction } from "../types/production.type";

const ProductionSchema = new mongoose.Schema<IProduction, mongoose.Model<IProduction, {}, {}>, {}>({
    production: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true,
    },
    created_at: {
        type: Date,
        required: true,
        index:true
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
    },
    machine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Machine',
        required: true
    }
})

export const Production = mongoose.model<IProduction, mongoose.Model<IProduction, {}, {}>>("Production", ProductionSchema)