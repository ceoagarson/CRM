import { Types } from "mongoose";
import { Asset } from "./asset.type";
import { IOrganization } from "./organization.type";

type BaseUser = {
    _id: string,
    username: string,
    password: string,
    email: string,
    mobile: number,
    organization: IOrganization,
}
type AdditionalData = {
    alternate_mobile: number,
    alternate_email: string,
    dp: Asset,
    roles: Types.Array<string>
}
type Status = {
    email_verified: Boolean,
    last_login: Date,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
    is_active: Boolean,

    // for react table actions
    actions: any
}
type Tokens = {
    resetPasswordToken: string | null,
    resetPasswordExpire: Date | null,
    emailVerifyToken: string | null,
    emailVerifyExpire: Date | null,
}

export type IUser = BaseUser & AdditionalData & Status & Tokens

export type IUserMethods = {
    getAccessToken: () => string,
    comparePassword: (password: string) => boolean,
    getResetPasswordToken: () => string,
    getEmailVerifyToken: () => string
}
export type TUserBody = Request['body'] & IUser;
