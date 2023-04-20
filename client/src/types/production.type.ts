import { Types } from "mongoose"
import { IUser } from "./user.type"
import { IMachine } from "./machine.types"

export type IProduction = {
    _id: string,
    production: string
    machine: IMachine,
    created_at:Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
}

export type TProductionBody = Request['body'] & IProduction;
export type TMachineBody = Request['body'] & IMachine;