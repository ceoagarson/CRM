import { Types } from "mongoose";
import { IAccount } from "./account.type";
import { ILead } from "./lead.type";
import { IOpportunity } from "./opportunity.types";
import { IOrganization } from "./organization.type";
import { IUser } from "./user.type";

type BaseActivity = {
    _id: Types.ObjectId,
    type: "telephonic" | "visited",
    description: string,
}
type AdditionalData ={
    resource: ILead | IAccount | IOpportunity | Types.ObjectId,
    resource_type: string
    remarks: string,
    activity_owner: IUser | Types.ObjectId,
    organization: IOrganization | Types.ObjectId,
}
type Status = {
    status: Boolean,
    status_changed_by: IUser | Types.ObjectId
    created_at: Date,
    updated_at: Date,
    updated_by: IUser | Types.ObjectId,
}
export type IActivity = BaseActivity & AdditionalData & Status
export type TActivityBody = Request['body'] & IActivity;
