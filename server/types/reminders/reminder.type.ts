import { Asset } from "../users/asset.type"
import { IUser } from "../users/user.type"

export type IFrequency = {
    _id?: string,
    type: string,//task or greeting
    frequencyType: string,
    frequency: string
}

export type IReminderTrigger = {
    _id: string,
    key: string,
    cronString: string,
    created_at: Date,
    updated_at: Date
    message: IReminder,
}
export type IReminderRefreshTrigger = {
    _id: string,
    key: string,
    cronString: string,
    created_at: Date,
    updated_at: Date
    message: IReminder
}

export type PersonWhatsappData = {
    message_id: string,
    person_name: string,
    person_phone: string,
    message_status: "pending" | "sent" | "read" | "delivered",
    message_timestamp: Date,
}

export interface IReminder {
    _id: string,
    file: Asset,
    reminder_message: string,
    persons: PersonWhatsappData[],
    is_active:boolean,
    
    run_once: boolean,
    autoRefresh: boolean,
    autoStop: boolean,

    frequency: IFrequency,
    running_trigger: IReminderTrigger,
    refresh_trigger: IReminderRefreshTrigger,

    start_date: Date,
    next_run_date: Date,
    next_refresh_date: Date,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}


export type ReminderBody = Request['body'] & IReminder;