import { IUser } from "../contexts/userContext";
import { IOrganization } from "./organization.type";

export interface IActivity {
    _id: string,
    type: "telephonic" | "visited",
    description: string,
    remarks: string,
    activity_owner: IUser,
    organization: IOrganization,
    resource: {
        id: string,
        type: "lead" | "account" | "opportunity"
    },
    open?: { status: Boolean, changedBy: IUser['username'] },
    createdAt?: Date,
    createdBy?: IUser,
    updatedBy?: IUser,
}