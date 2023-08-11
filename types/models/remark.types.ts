import { ILead } from "./lead.type";
import { IUser } from "./user.type";

export type IRemark = {
    _id: string,
    remark: string,
    lead: ILead,
    created_at: Date,
    updated_at: Date,
    created_by: IUser,
    updated_by: IUser
}

export type TRemarkBody = Request['body'] & IRemark;
