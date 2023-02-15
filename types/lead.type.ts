import { Types } from "mongoose";
import { IActivity } from "./activity.type";
import { Asset } from "./asset.type";

export interface BaseLead {
    name: string,
    mobile: number
    email: string
}
export interface ILead extends BaseLead {
    _id: Types.ObjectId,
    city?: string,
    state?: string,
    description?: string,
    lead_type?: "easy" | "tricky" | "hard"
    lead_owner?: Types.ObjectId,
    organization?: Types.ObjectId
    dp?: Asset
    customer_name: string,
    address?: string,
    country?: string
    alternate_mobile?: number,
    alternate_email?: string,
    customer_designination?: string,
    lead_source?: string,
    remarks?: string,
    open?: {status:Boolean,changedBy:Types.ObjectId},
    createdOn?: Date,
    activities?: IActivity[]
}
export type TLeadBody = Request['body'] & ILead;
