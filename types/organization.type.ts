import { Types } from "mongoose"
import { Asset } from "./asset.type"
import { IUser } from "./user.type"

type BaseOrganization = {
    _id: Types.ObjectId,
    organization_name: string,
    organization_email: string,
    mobile: number,
}
type AdditionalData = {
    organization_dp: Asset,
    owners: IUser[] | Types.ObjectId[],
    alternate_mobile: number,
    alternate_email: string,
    country: string,
    address: string
}
type Status = {
    email_verified: Boolean,
    created_at: Date,
    created_by: IUser | Types.ObjectId,
    updated_at: Date,
    updated_by: IUser | Types.ObjectId
    is_active: Boolean,
}
type Tokens = {
    emailVerifyToken: string,
    emailVerifyExpire: Date
}

export type IOrganizationMethods = {
    getEmailVerifyToken: () => string
}
export type IOrganization = BaseOrganization & AdditionalData & Status & Tokens
export type TOrganizationBody = Request['body'] & IOrganization;
