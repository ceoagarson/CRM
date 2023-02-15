import { Types } from "mongoose"
import { Asset } from "./asset.type"
import { IUser } from "./user.type"

export interface BaseOrganization {
    organization_name: string,
    organization_email: string
}

export interface IOrganization extends BaseOrganization {
    _id?: Types.ObjectId,
    organization_dp?: Asset,
    owners:IUser[],
    email_verified?: Boolean,
    createdAt?: Date,
    is_active?: Boolean
    emailVerifyToken?: string,
    emailVerifyExpire?: Date
}
export interface IOrganizationMethods {
    getEmailVerifyToken: () => string
}
export type TOrganizationBody = Request['body'] & IOrganization;
