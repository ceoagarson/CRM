import { Types } from "mongoose";
import { IActivity } from "./activity.type";
import { Asset } from "./asset.type";
import { IOrganization } from "./organization.type";
import { IUser } from "./user.type";

type BaseAccount = {
    _id: Types.ObjectId,
    name: string,
    customer_name: string,
    customer_designation: string,
    mobile: number
    email: string
    city: string,
    state: string,
    address: string,
    description: string,
}
type AdditionalData = {
    alternate_mobile: number,
    alternate_email: string,
    probability: "easy" | "medium" | "hard"
    account_owner: IUser,
    organization: IOrganization
    dp: Asset
    account_source: string,
    remarks: string,
    country: string
}
type Status = {
    status: Boolean,
    status_changed_by: IUser
    created_at: Date,
    updated_at: Date,
    updated_by: IUser
    activities: Array<IActivity['_id']> 
}
export type IAccount = BaseAccount & AdditionalData & Status
export type TAccountBody = Request['body'] & IAccount;
