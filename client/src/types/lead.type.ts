import { IUser } from "../contexts/userContext";
import { IActivity } from "./activity.type";
import { Asset } from "./asset.type";

export interface ILead{
    _id: string,
    name: string,
    mobile: number
    email: string
    city?: string,
    state?: string,
    description?: string,
    lead_type?: "easy" | "medium" | "hard"
    lead_owner?: IUser,
    organization?: IUser
    dp?: Asset
    customer_name: string,
    address?: string,
    country?: string
    alternate_mobile?: number,
    alternate_email?: string,
    customer_designination?: string,
    lead_source?: string,
    remarks?: string,
    open?: { status: Boolean, changedBy: IUser['username'] },
    createdAt?: Date,
    createdBy?: IUser,
    updatedBy?: IUser,
    activities?: IActivity[],
    actions?: any
}
