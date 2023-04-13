import { Types } from "mongoose";
import { Asset } from "./asset.type";
import { IOrganization } from "./organization.type";

export type IUser = {
    _id: Types.ObjectId,
    username: string,
    password: string,
    email: string,
    mobile: number,
    organization: IOrganization
    dp: Asset,
    roles: Types.Array<string>
    email_verified: Boolean,
    last_login: Date,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
    is_active: Boolean,
    resetPasswordToken: string | null,
    resetPasswordExpire: Date | null,
    emailVerifyToken: string | null,
    emailVerifyExpire: Date | null,
}

export type IUserMethods = {
    getAccessToken: () => string,
    comparePassword: (password: string) => boolean,
    getResetPasswordToken: () => string,
    getEmailVerifyToken: () => string
}
export type TUserBody = Request['body'] & IUser;
