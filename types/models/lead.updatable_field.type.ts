import { IUser } from "./user.type";

export type ILeadUpdatableField = {
    _id: string,
    stage: string[],
    lead_types: string[],
    lead_source: string[],
    updated_at: Date,
    created_at: Date,
    created_by: IUser,
    updated_by: IUser
}

export type TLeadUpdatableFieldBody = Request['body'] & ILeadUpdatableField;
