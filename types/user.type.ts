import { Types } from "mongoose";
import { Asset } from "./asset.type";
import { IOrganization } from "./organization.type";

export interface BaseIUser {
    username: string,
    password: string,
    email: string,
    organization: IOrganization
}
export interface IUser extends BaseIUser {
    _id?: Types.ObjectId,
    dp?: Asset,
    roles?: Types.Array<string>,
    email_verified?: Boolean,
    last_login?: Date,
    createdAt?: Date,
    createdBy?: IUser | IUser['_id'],
    is_active: Boolean,
    resetPasswordToken?: string,
    resetPasswordExpire?: Date,
    emailVerifyToken?: string,
    emailVerifyExpire?: Date,
}

export interface IUserMethods {
    getAccessToken: () => string,
    comparePassword: (password: string) => boolean,
    getResetPasswordToken: () => string,
    getEmailVerifyToken: () => string
}
export type TUserBody = Request['body'] & IUser;