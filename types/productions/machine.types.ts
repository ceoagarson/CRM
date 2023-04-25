import { Types } from "mongoose"
import { IUser } from "../users/user.type"
import { ICategory } from "./category.types"

export type IMachine = {
    _id: Types.ObjectId,    
    name: string,
    category: ICategory,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}

export type TMachineBody = Request['body'] & IMachine;
