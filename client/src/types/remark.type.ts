import { Types } from "mongoose";
import { IUser } from "./user.type";
import { ILead } from "./lead.type";

export type IRemark = {
    _id: Types.ObjectId,
    remark: string,
    lead: ILead,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}


