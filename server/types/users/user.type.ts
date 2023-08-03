import { Types } from "mongoose";
import { Asset } from "./asset.type";

export type LeadFieldType = "name" | "customer_name" | "customer_designation" | "mobile" |    "email" | "city" | "state" | "country" | "address" | "remarks" | "work_description" | "turnover" | "lead_type" | "stage" | "alternate_mobile1" | "alternate_mobile2" | "alternate_email" | "lead_owners" | "lead_source" | "created_at" | "created_by" | "updated_at" | "updated_by"

export const all_fields: LeadFieldType[] = ["name", "customer_name", "customer_designation", "mobile", "email", "city", "state", "country", "address", "remarks", "work_description", "turnover", "lead_type", "stage", "alternate_mobile1", "alternate_mobile2", "alternate_email", "lead_owners", "lead_source", "created_at", "created_by", "updated_at", "updated_by"]

export type LeadField={
    field: LeadFieldType,
    readonly:Boolean,
    hidden: Boolean
}

export type IUser = {
    //user properties
    _id: Types.ObjectId,
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
    is_admin:Boolean,
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
