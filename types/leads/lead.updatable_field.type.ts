import { IUser } from "../users/user.type";

export type ILeadUpdatableField = {
    _id: string,
    stages: string[],
    lead_types: string[],
    lead_sources: string[],
    updated_at: Date,
    created_at: Date,
    created_by: IUser,
    updated_by: IUser
}

export type TLeadUpdatableFieldBody = Request['body'] & ILeadUpdatableField;
