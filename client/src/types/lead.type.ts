import { IOrganization } from "./organization.type";
import { IUser } from "./user.type";

export type IRemark = {
    _id: string,
    remark: string,
    lead: ILead,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}


export type ILead = {
    _id: string,
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
    lead_owners: IUser[],
    organization: IOrganization
    lead_source: string,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser,
    // for react table
    actions?: any
}

