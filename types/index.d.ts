import { IUser } from "./user.type";

//recognize it as module
export { }

declare declare global {
    namespace Express {
        export interface Request {
            user?: IUser | null
        }
    }
}