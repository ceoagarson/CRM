import { IUser } from "./user.type"

export type IProduction = {
    _id: string,
    production: string
    machine: IMachine,
    created_at:Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser,
    //react table args
    actions?:any,
    category?:string
}

export type ICategory = {
    _id: string,
    category: string,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
    actions?: any,
}

export type IMachine = {
    _id: string,
    name: string,
    category: ICategory,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
    // actions
    actions?: any
}
