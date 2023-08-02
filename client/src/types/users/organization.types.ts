import { IUser } from "../users/user.type";

export type IOrganization = {
    _id: string,
    organization: string,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}

export type TOrganizationBody = Request['body'] & IOrganization;
