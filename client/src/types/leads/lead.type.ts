import { IUser } from "../users/user.type";
import { IRemark } from "./remark.types";
import { Asset } from "../users/asset.type";

export type ILead = {
    _id: string,
    name: string,
    customer_name: string,
    customer_designation: string,
    mobile: string,
    email: string,
    city: string,
    state: string,
    country: string,
    address: string,
    work_description: string,
    turnover: string,
    alternate_mobile1: string,
    alternate_mobile2: string,
    alternate_email: string,

    lead_type: string
    stage: string
    lead_source: string

    remarks: {
        last_remark: string,
        remarks: IRemark[]
    },
    lead_owners: {
        username: string,
        user: IUser
    }[],

    visiting_card: Asset,
    is_customer: boolean,

    last_whatsapp_date: Date,
    created_at: Date,
    created_by: {
        username: string,
        user: IUser
    },
    updated_at: Date,
    updated_by: {
        username: string,
        user: IUser
    }
}


