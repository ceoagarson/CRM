import { Asset } from "./asset.type";
import { IOrganization } from "./organization.types";

export type LeadFieldType = "name" | "customer_name" | "customer_designation" | "mobile" |    "email" | "city" | "state" | "country" | "address" | "remarks" | "work_description" | "turnover" | "lead_type" | "stage" | "alternate_mobile1" | "alternate_mobile2" | "alternate_email" | "lead_owners" | "lead_source" | "created_at" | "created_by" | "updated_at" | "updated_by"

export const all_fields: LeadFieldType[] = ["name", "customer_name", "customer_designation", "mobile", "email", "city", "state", "country", "address", "remarks", "work_description", "turnover", "lead_type", "stage", "alternate_mobile1", "alternate_mobile2", "alternate_email", "lead_owners", "lead_source", "created_at", "created_by", "updated_at", "updated_by"]

export type LeadField={
    field: LeadFieldType,
    readonly:Boolean,
    hidden: Boolean
}

export type IUser = {
    _id:string,
    username: string,
    password: string,
    email: string,
    mobile: string,
    organization: IOrganization,
    dp: Asset,
    is_admin:Boolean,
    lead_fields: LeadField[],
    email_verified: Boolean,
    last_login: Date,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
    is_active: Boolean,
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
