import { Asset } from "./asset.type"

export type LeadFieldType = "_id" | "name" | "customer_name" | "customer_designation" | "mobile" | "email" | "city" | "state" | "country" | "address" | "work_description" | "turnover" | "alternate_mobile1" | "alternate_mobile2" | "alternate_email" | "lead_type" | "stage" | "lead_source" | "remarks" | "lead_owners" | "visiting_card" | "is_customer" | "last_whatsapp_date" | "created_at" | "created_by" | "updated_at" | "updated_by" | "allow_delete" | "allow_update" | "allow_create" | "allow_convert_to_customer" | "add_remarks" | "export_to_excel" | "view_remarks"

export const all_fields: LeadFieldType[] = [
    "_id", "name", "customer_name", "customer_designation", "mobile", "email", "city", "state", "country", "address", "work_description", "turnover", "alternate_mobile1", "alternate_mobile2", "alternate_email", "lead_type", "stage", "lead_source", "remarks", "lead_owners", "visiting_card", "is_customer", "last_whatsapp_date", "created_at", "created_by", "updated_at", "updated_by", "allow_delete", "allow_update", "allow_create", "allow_convert_to_customer", "add_remarks", "export_to_excel", "view_remarks"
]



export type BotFieldType = "allow_connect_whatsapp" | "allow_view_trackers" | "edit_greeting_customer_name" | "allow_start_and_stop_bot_for_a_person" | "allow_create_flow" | "allow_edit_flow" | "allow_delete_flow" | "flow_status" | "view_connected_users" | "connected_phone" | "triggers" | "flow_name" | "last_edit_by" | "last_edit_date" | "view_cutsomer_name" | "view_customer_phone" | "view_tracker_flow" | "view_last_interaction" | "allow_flow_assignment" | "export_to_excel" | "activate_flow" | "created_by" | "edit_customer_name"

export const all_Bot_fields: BotFieldType[] = [
    "allow_connect_whatsapp", "allow_view_trackers", "activate_flow", "edit_greeting_customer_name", "allow_start_and_stop_bot_for_a_person", "allow_create_flow", "allow_edit_flow", "allow_delete_flow", "flow_status", "view_connected_users", "triggers", "flow_name", "last_edit_by", "last_edit_date", "view_cutsomer_name", "view_customer_phone", "view_tracker_flow", "view_last_interaction", "allow_flow_assignment", "export_to_excel", "created_by", "edit_customer_name","connected_phone"
]


export type LeadField = {
    field: LeadFieldType,
    readonly: Boolean,
    hidden: Boolean
}
export type BotField = {
    field: BotFieldType,
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
    bot_fields: BotField[]
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

