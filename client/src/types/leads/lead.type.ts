import { IUser } from "../users/user.type";
import { IRemark } from "./remark.types";

export type ILead = {
    _id: string,
    name: string,
    customer_name: string,
    customer_designation: string,
    mobile: string,
    email: string
    city: string,
    state: string,
    country: string,
    address: string,
    remarks: IRemark[],
    work_description: string,
    turnover: string,
    preserved:boolean,
    lead_type: "wholesale" | "retail" | "company" | "mixed"
    stage: "open" | "won" | "won dealer" | "lost" | "useless" | "potential"
    alternate_mobile1: string,
    alternate_mobile2: string,
    alternate_email: string,
    lead_owners: IUser[],
    lead_source: string,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}

export type TLeadBody = Request['body'] & ILead;
