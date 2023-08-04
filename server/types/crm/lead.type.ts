import { Types } from "mongoose";
import { IUser } from "../users/user.type";
import { IRemark } from "./remark.types";
import { Asset } from "../users/asset.type";

export type ILead = {
    _id: Types.ObjectId,
    name: string,
    customer_name: string,
    customer_designation: string,
    mobile: number,
    email: string,
    city: string,
    state: string,
    country: string,
    address: string,
    work_description: string,
    turnover: number,
    alternate_mobile1: number,
    alternate_mobile2: number,
    alternate_email: string,

    lead_type: "wholesale" | "retail" | "company" | "mixed"
    stage: "open" | "won" | "won dealer" | "lost" | "useless" | "potential"
    lead_source: "internet" | "visiting" | "whatsapp" | "facebook" | "indiamart" | "justdial" | "calling" |
    "email" | "others",

    remarks: IRemark[],
    lead_owners: IUser[],

    visiting_card: Asset,
    is_customer: boolean,
    
    last_whatsapp_date:Date,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}

export type TLeadBody = Request['body'] & ILead;
