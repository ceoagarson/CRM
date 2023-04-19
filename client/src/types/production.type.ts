import { IMachine } from "./machine.types"
import { IUser } from "./user.type"

export type IProduction = {
    _id: string,
    production: number
    machine: IMachine,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
    actions?: any
}

