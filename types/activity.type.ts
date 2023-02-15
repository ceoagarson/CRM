import { Types } from "mongoose";

export interface IActivity {
    _id:Types.ObjectId,
    type: "telephonic" | "visited",
    description: string,
    remarks: string,
    activity_owner: Types.ObjectId,
    organization: Types.ObjectId,
    resource: {
        id: Types.ObjectId,
        type: "lead" | "account" | "opportunity"
    },
    open: { status: Boolean, changedBy: Types.ObjectId },
    createdOn?: Date
}
export type TActivityBody = Request['body'] & IActivity;
