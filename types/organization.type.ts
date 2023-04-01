import { Types } from "mongoose"
import { Asset } from "./asset.type"
import { IUser } from "./user.type"

type BaseOrganization = {
    _id: Types.ObjectId,
    organization_name: string,
    organization_email: string,
    organization_mobile: number,
}
type AdditionalData = {
    organization_dp: Asset,
    owners: IUser[]
    country: string,
    address: string
}
type Status = {
    email_verified: Boolean,
    created_at: Date,
    created_by: IUser ,
    updated_at: Date,
    updated_by: IUser 
    is_active: Boolean,
}
type Tokens = {
    emailVerifyToken: string | null,
    emailVerifyExpire: Date | null
}

export type IOrganizationMethods = {
    getEmailVerifyToken: () => string
}
export type IOrganization = BaseOrganization & AdditionalData & Status & Tokens
export type TOrganizationBody = Request['body'] & IOrganization;
