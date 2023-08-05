import { Asset } from "./asset.type";

export type LeadFieldType = "_id" | "name" | "customer_name" | "customer_designation" | "mobile" | "email" | "city" | "state" | "country" | "address" | "work_description" | "turnover" | "alternate_mobile1" | "alternate_mobile2" | "alternate_email" | "lead_type" | "stage" | "lead_source" | "remarks" | "lead_owners" | "visiting_card" | "is_customer" | "last_whatsapp_date" | "created_at" | "created_by" | "updated_at" | "updated_by"

export const all_fields: LeadFieldType[] = [
    "_id", "name", "customer_name", "customer_designation", "mobile", "email", "city", "state", "country", "address", "work_description", "turnover", "alternate_mobile1", "alternate_mobile2", "alternate_email", "lead_type", "stage", "lead_source", "remarks", "lead_owners", "visiting_card", "is_customer", "last_whatsapp_date", "created_at", "created_by", "updated_at", "updated_by"
]

export type LeadField = {
    field: LeadFieldType,
    readonly: Boolean,
    hidden: Boolean
}

export type IUser = {
    //user properties
    _id: string,
    username: string,
    password: string,
    email: string,
    mobile: number,
    dp: Asset,

    //bot properties
    client_id: string,
    client_data_path: string,
    connected_number: number,
    is_whatsapp_active: Boolean,

    //auth properties
    is_admin: Boolean,
    lead_fields: LeadField[],
    email_verified: Boolean,
    is_active: Boolean,

    //date properties
    last_login: Date,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser

    //tokens
    resetPasswordToken: string | null,
    resetPasswordExpire: Date | null,
    emailVerifyToken: string | null,
    emailVerifyExpire: Date | null,
}

export type IUserMethods = {
    getAccessToken: () => string,
    comparePassword: (password: string) => boolean,
    getResetPasswordToken: () => string,
    getEmailVerifyToken: () => string
}
export type TUserBody = Request['body'] & IUser;
