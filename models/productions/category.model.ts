import mongoose from "mongoose"
import { ICategory } from "../../types/productions/category.types"

const CategorySchema = new mongoose.Schema<ICategory, mongoose.Model<ICategory, {}, {}>, {}>({
    category: {
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

export const Category = mongoose.model<ICategory, mongoose.Model<ICategory, {}, {}>>("Category", CategorySchema)