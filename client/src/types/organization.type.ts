import { Asset } from "./asset.type"
import { IUser } from "./user.type"

export interface BaseOrganization {
    organization_name: string
}
export interface IOrganization extends BaseOrganization {
    _id?: string,
    organization_email?: string
    organization_dp?: Asset,
    owners?:IUser[],
    email_verified?: Boolean,
    createdAt?: Date,
    is_active?: Boolean
}
