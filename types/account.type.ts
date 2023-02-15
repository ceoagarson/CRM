import { Types } from "mongoose";
import { IActivity } from "./activity.type";
import { Asset } from "./asset.type";

export interface BaseAccount {
    name: string,
    mobile: number
    email: string
}
export interface IAccount extends BaseAccount {
    _id: Types.ObjectId,
    city?: string,
    state?: string,
    description?: string,
    account_type?: "easy" | "tricky" | "hard"
    account_owner?: Types.ObjectId,
    organization?: Types.ObjectId
    dp?: Asset
    customer_name: string,
    address?: string,
    country?: string
    alternate_mobile?: number,
    alternate_email?: string,
    customer_designination?: string,
    account_source?: string,
    remarks?: string,
    open?: {status:Boolean,changedBy:Types.ObjectId},
    createdOn?: Date,
    activities?: IActivity[]
}
export type TAccountBody = Request['body'] & IAccount;
