import cloudinary from "cloudinary"
import { Asset } from "../types/types/asset.type";

//upload a file in cloudinary
export const uploadFileToCloudinary = async (filepath: string, storageLocation: string) => {
    let document: Asset | undefined = undefined
    try {
        const result = await cloudinary.v2.uploader.upload(filepath, { folder: storageLocation });
        document = {
            public_id: result.public_id,
            url: result.secure_url,
            size: result.bytes,
            format: result.format
        }
        return document;
    }
    catch (err) {
        console.log("cloudinary error", err);
        return undefined;

    }
}