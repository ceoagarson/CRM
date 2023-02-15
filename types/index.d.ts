import { IUser } from "../models/user.model";
import { IOwner } from "./owner.type";

//recognize it as module
export { }

declare declare global {
    namespace Express {
        export interface Request {
            user?: IUser
        }
    }
}