import { Types } from "mongoose";
import { IUser } from "../users/user.type";

export type ICategory = {
    _id: Types.ObjectId,
    category: string,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}

export type TCategoryBody = Request['body'] & ICategory;