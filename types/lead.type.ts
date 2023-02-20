import { Types } from "mongoose";
import { IActivity } from "./activity.type";
import { Asset } from "./asset.type";
import { IOrganization } from "./organization.type";
import { IUser } from "./user.type";

type BaseLead = {
    _id: Types.ObjectId,
    name: string,
    customer_name: string,
    customer_designination?: string,
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
    lead_owner: IUser | Types.ObjectId,
    organization: IOrganization | Types.ObjectId
    dp: Asset
    lead_source: string,
    remarks: string,
    country: string
}
type Status = {
    status: Boolean,
    status_changed_by: IUser | Types.ObjectId
    created_at: Date,
    updated_at: Date,
    updated_by: IUser | Types.ObjectId
    activities: IActivity[] | Types.ObjectId[]
}
export type ILead = BaseLead & AdditionalData & Status
export type TLeadBody = Request['body'] & ILead;
