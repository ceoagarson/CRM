import { Asset } from "../users/asset.type"
import { IUser } from "../users/user.type"

export type ITextMessage = {
    index: number,
    message: string
}

export type IMediaMessage = {
    index: number,
    media: Asset
}

export type IMediaWithCaptionMessage = {
    index: number,
    media: Asset,
    captain: string
}

export type IFrequency = {
    type: string,
    frequency: string
}

//for models

export type IMessageTemplate = {
    _id: string,
    message?: ITextMessage[],
    media?: IMediaMessage[]
    media_with_captain?: IMediaWithCaptionMessage[],
    created_at:Date,
    updated_at:Date,
    created_by:IUser,
    updated_by:IUser
}

export type IMessage = {
    _id: string,
    message?: ITextMessage[],
    media?: IMediaMessage[]
    media_with_captain?: IMediaWithCaptionMessage[],
    created_at: Date,
    updated_at: Date,
    created_by: IUser,
    updated_by: IUser
}


export type ISchedulerReport = {
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
export type IScheduler = {
    _id: string,
    key: string,
    cronString: string,
    frequency: IFrequency,
    template: IMessageTemplate
    message: IMessage,
    reports: ISchedulerReport[]
    created_at: Date,
    updated_at: Date,
    created_by: IUser,
    updated_by: IUser
}


export type ISchedulerBody = Request['body'] & IScheduler;
export type ISchedulerReportBody = Request['body'] & ISchedulerReport;
export type IMessageTemplateBody = Request['body'] & IMessageTemplate;
export type IMessageBody = Request['body'] & IMessage;