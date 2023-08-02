import { ILead } from "./lead.type";
import { IUser } from "../users/user.type";

export type IRemark = {
    _id: string,
    remark: string,
    lead: ILead,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}

