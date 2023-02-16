import { Asset } from "./asset.type";
import { IOrganization } from "./organization.type";

export interface BaseIUser {
    username: string,
}
export interface IUser extends BaseIUser {
    _id?: string,
    dp?: Asset,
    email?: string,
    organization?: IOrganization
    roles?: string[],
    email_verified?: Boolean,
    last_login?: Date,
    createdAt?: Date,
    is_active?: Boolean
}