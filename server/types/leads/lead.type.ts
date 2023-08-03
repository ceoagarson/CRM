import { Types } from "mongoose";
import { IUser } from "../users/user.type";
import { IRemark } from "./remark.types";
import { Asset } from "../users/asset.type";

export type ILead = {
    _id: Types.ObjectId,
    name: string,
    customer_name: string,
    customer_designation: string,
    mobile: string,
    email: string,
    visiting_card: Asset,
    city: string,
    state: string,
    country: string,
    address: string,
    remarks: IRemark[],
    work_description: string,
    turnover: string,
    lead_type: "wholesale" | "retail" | "company" | "mixed"
    stage: "open" | "won" | "won dealer" | "lost" | "useless" | "potential"
    alternate_mobile1: string,
    alternate_mobile2: string,
    alternate_email: string,
    lead_owners: IUser[],
    lead_source: "internet" | "visiting" | "whatsapp" | "facebook" | "indiamart" | "justdial" | "calling" |
    "email" | "others",
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}

export type TLeadBody = Request['body'] & ILead;
