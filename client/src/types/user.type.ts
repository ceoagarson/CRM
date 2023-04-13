import { Asset } from "./asset.type";
import { IOrganization } from "./organization.type";

export type IUser = {
    _id: string,
    username: string,
    password: string,
    email: string,
    mobile: number,
    organization: IOrganization,
    dp: Asset,
    roles: Array<string>
    email_verified: Boolean,
    last_login: Date,
    created_at: Date,
    created_by: IUser,
    updated_at: Date,
    updated_by: IUser
    is_active: Boolean,
    // for react table actions
    actions: any
    resetPasswordToken: string | null,
    resetPasswordExpire: Date | null,
    emailVerifyToken: string | null,
    emailVerifyExpire: Date | null,
}
