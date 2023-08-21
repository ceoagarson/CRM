import { ILead } from "./lead.type";
import { IUser } from "../users/user.type";

export type IReferredParty = {
    _id: string,
    name: string,
    mobile: string,
    city: string,
    state: string
}


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
