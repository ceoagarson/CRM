import { Types } from "mongoose"
import { Asset } from "./asset.type"
import { IUser } from "./user.type"

export type IOrganization = {
    _id: Types.ObjectId,
    organization_name: string,
    organization_email: string,
    organization_mobile: string,
    organization_dp: Asset,
    owner: IUser,
    country: string,
    address: string
    email_verified: Boolean,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
    is_active: Boolean,
    emailVerifyToken: string | null,
    emailVerifyExpire: Date | null
}

export type IOrganizationMethods = {
    getEmailVerifyToken: () => string
}
export type TOrganizationBody = Request['body'] & IOrganization;
