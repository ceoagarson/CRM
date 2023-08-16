import { Asset } from "./asset.type";

export type LeadFieldType = "_id" | "name" | "customer_name" | "customer_designation" | "mobile" | "email" | "city" | "state" | "country" | "address" | "work_description" | "turnover" | "alternate_mobile1" | "alternate_mobile2" | "alternate_email" | "lead_type" | "stage" | "lead_source" | "remarks" | "lead_owners" | "visiting_card" | "is_customer" | "last_whatsapp_date" | "created_at" | "created_by" | "updated_at" | "updated_by" | "allow_delete" | "allow_update" | "allow_create" | "allow_convert_to_customer" | "add_remarks" | "export_to_excel" | "view_remarks"

export const all_fields: LeadFieldType[] = [
    "_id", "name", "customer_name", "customer_designation", "mobile", "email", "city", "state", "country", "address", "work_description", "turnover", "alternate_mobile1", "alternate_mobile2", "alternate_email", "lead_type", "stage", "lead_source", "remarks", "lead_owners", "visiting_card", "is_customer", "last_whatsapp_date", "created_at", "created_by", "updated_at", "updated_by", "allow_delete", "allow_update", "allow_create", "allow_convert_to_customer", "add_remarks", "export_to_excel", "view_remarks"
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
    mobile: string,
    dp: Asset,

    //bot properties
    client_id: string,
    client_data_path: string,
    connected_number: string,
    is_whatsapp_active: Boolean,

    //auth properties
    is_admin: Boolean,
    lead_fields: LeadField[],
    email_verified: Boolean,
    is_active: Boolean,
    last_login: Date,
    created_at: Date,
    updated_at: Date,

    //ref properties
    created_by_username: string,
    created_by: IUser,
    updated_by_username: string,
    updated_by: IUser

    //tokens
    resetPasswordToken: string | null,
    resetPasswordExpire: Date | null,
    emailVerifyToken: string | null,
    emailVerifyExpire: Date | null
}

export type IUserMethods = {
    getAccessToken: () => string,
    comparePassword: (password: string) => boolean,
    getResetPasswordToken: () => string,
    getEmailVerifyToken: () => string
}
export type TUserBody = Request['body'] & IUser;
