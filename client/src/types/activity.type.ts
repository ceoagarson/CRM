import { IOrganization } from "./organization.type";
import { IUser } from "./user.type";

type BaseActivity = {
    _id:string,
    activity_type: "telephonic" | "visited",
    description: string,
    resource_id:string,
    resource_type: "lead" | "account" | "opportunity"
}
type AdditionalData = {
    remarks: string,
    activity_owner: IUser ,
    organization: IOrganization ,
}
type Status = {
    status: Boolean,
    status_changed_by: IUser ,    created_at: Date,
    updated_at: Date,
    updated_by: IUser ,
}
export type IActivity = BaseActivity & AdditionalData & Status
export type TActivityBody = Request['body'] & IActivity;
