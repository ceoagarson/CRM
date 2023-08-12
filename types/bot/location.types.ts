import { Asset } from "../users/asset.type"
import { IUser } from "../users/user.type"

export type WhatsappLocation=
    {
        stored_at: Date,
        location: {
            latitude: number,
            longitude: number,
            device:string,
            photo:Asset
        }
    }
    
export type IUserLocation={
    user:IUser,
    locations: WhatsappLocation[]
}