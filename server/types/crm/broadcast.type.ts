import { IFrequency } from "./reminder.type"
import { Asset } from "../users/asset.type"
import { IUser } from "../users/user.type"

export type IBroadcastTrigger = {
    _id: string,
    key: string,
    cronString: string,
    created_at: Date,
    updated_at: Date
    message: IBroadcast,
}

export type PersonWhatsappData = {
    message_id: string,
    person_name: string,
    person_phone: string,
    message_status: "pending" | "sent" | "read" | "delivered",
    message_timestamp: Date,
}

export interface IBroadcast {
    _id: string,
    file: Asset,
    broadcast_messgae: string,
    persons: PersonWhatsappData[],
    is_active:boolean,
    
    run_once: boolean,
    autoRefresh: boolean,
    autoStop: boolean,

    frequency: IFrequency,
    running_trigger: IBroadcastTrigger,

    start_date: Date,
    next_run_date: Date,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}


export type BroadcastBody = Request['body'] & IBroadcast;