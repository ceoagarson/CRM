import { IOrganization } from "./organization.type";
import { IUser } from "./user.type";

export interface IActivity {
    _id:string,
    type: "telephonic" | "visited",
    description: string,
    remarks: string,
    activity_owner: IUser,
    organization: IOrganization,
    resource: {
        id: string,
        type: "lead" | "account" | "opportunity"
    },
    open: { status: Boolean, changedBy: IUser },
    createdOn?: Date
}
