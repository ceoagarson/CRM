import { Types } from "mongoose";
import { IOrganization } from "./organization.type";
import { IUser } from "./user.type";
import { IRemark } from "./remark.type";


export type ILead = {
    _id: Types.ObjectId,
    name: string,
    customer_name: string,
    customer_designation: string,
    mobile: number,
    email: string
    city: string,
    state: string,
    country: string,
    address: string,
    remarks: IRemark[],
    work_description: string,
    turnover: string,
    lead_type: "wholesale" | "retail" | "company" | "mixed"
    stage: "open" | "won" | "won dealer" | "lost" | "useless" | "potential"
    alternate_mobile1: number,
    alternate_mobile2: number,
    alternate_email: string,
    lead_owner: IUser,
    organization: IOrganization
    lead_source: string,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}

export type TLeadBody = Request['body'] & ILead;
