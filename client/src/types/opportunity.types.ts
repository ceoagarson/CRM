import { IActivity } from "./activity.type";
import { Asset } from "./asset.type";
import { IOrganization } from "./organization.type";
import { IUser } from "./user.type";

export interface BaseOpportunity {
    name: string,
    mobile: number
    email: string
}
export interface IOpportunity extends BaseOpportunity {
    _id: string,
    city?: string,
    state?: string,
    description?: string,
    opportunity_type?: "easy" | "tricky" | "hard"
    opportunity_owner?: IUser,
    organization?: IOrganization
    dp?: Asset
    customer_name: string,
    address?: string,
    country?: string
    alternate_mobile?: number,
    alternate_email?: string,
    customer_designination?: string,
    opportunity_source?: string,
    remarks?: string,
    open?: {status:Boolean,changedBy:IUser},
    createdOn?: Date,
    activities?: IActivity[]
}
