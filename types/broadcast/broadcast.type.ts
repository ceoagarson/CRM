import { IFrequency, IMessage, IMessageTemplate } from "../scheduler/scheduler.types"
import { IUser } from "../users/user.type"

//for models
export type IBroadcastReport = {
    _id: string,
    customer_name: string,
    mobile: string,
    status: string,
    next_run_date: Date,
    created_at: Date,
    updated_at: Date,
    created_by: IUser,
    updated_by: IUser

}
export type IBroadcast = {
    _id: string,
    key: string,
    cronString: string,
    frequency: IFrequency,
    template: IMessageTemplate
    message: IMessage,
    reports: IBroadcastReport[]
    created_at: Date,
    updated_at: Date,
    created_by: IUser,
    updated_by: IUser
}

export type IBroadcastReportBody = Request['body'] & IBroadcastReport;
export type IBroadcastBody = Request['body'] & IBroadcast;