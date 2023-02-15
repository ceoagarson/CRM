import { IActivity } from "./activity.type";
import { Asset } from "./asset.type";
import { IOrganization } from "./organization.type";
import { IUser } from "./user.type";

export interface BaseAccount {
    name: string,
    mobile: number
    email: string
}
export interface IAccount extends BaseAccount {
    _id:string,
    city?: string,
    state?: string,
    description?: string,
    account_type?: "easy" | "tricky" | "hard"
    account_owner?:IUser,
    organization?: IOrganization
    dp?: Asset
    customer_name: string,
    address?: string,
    country?: string
    alternate_mobile?: number,
    alternate_email?: string,
    customer_designination?: string,
    account_source?: string,
    remarks?: string,
    open?: {status:Boolean,changedBy:IUser},
    createdOn?: Date,
    activities?: IActivity[]
}
