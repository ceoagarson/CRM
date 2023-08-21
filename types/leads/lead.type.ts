import { IUser } from "../users/user.type";
import { IReferredParty, IRemark } from "./remark.types";
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

    // new
    remarks: IRemark[]
    last_remark: string,
    lead_owners_username: string[]
    lead_owners: IUser[],

    visiting_card: Asset,
    is_customer: boolean,


    referred_party: IReferredParty,
    referred_party_name: string,
    referred_party_mobile: string,
    referred_date: Date,

    last_whatsapp_date: Date,
    created_at: Date,
    updated_at: Date,
    created_by_username: string,
    created_by: IUser,
    updated_by_username: string,
    updated_by: IUser
}

export type TLeadBody = Request['body'] & ILead;
