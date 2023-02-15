import { IActivity } from "./activity.type";
import { Asset } from "./asset.type";
import { IOrganization } from "./organization.type";
import { IUser } from "./user.type";

export interface BaseLead {
    name: string,
    mobile: number
    email: string
}
export interface ILead extends BaseLead {
    _id: string,
    city?: string,
    state?: string,
    description?: string,
    lead_type?: "easy" | "tricky" | "hard"
    lead_owner?: IUser,
    organization?: IOrganization
    dp?: Asset
    customer_name: string,
    address?: string,
    country?: string
    alternate_mobile?: number,
    alternate_email?: string,
    customer_designination?: string,
    lead_source?: string,
    remarks?: string,
    open?: {status:Boolean,changedBy:IUser},
    createdOn?: Date,
    activities?: IActivity[]
}
