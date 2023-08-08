import { Types } from "mongoose";
import { ILead } from "./lead.type";
import { IUser } from "../users/user.type";

export type IRemark = {
    _id: Types.ObjectId,
    remark: string,
    lead: ILead,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}

export type TRemarkBody = Request['body'] & IRemark;
