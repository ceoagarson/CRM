import cloudinary from "cloudinary";
//destroy a document in cloudinary

export const destroyFile = async (public_id: string) => {
  try {
    const result = await cloudinary.v2.api.resource(public_id);
    if (result)
      if (result.public_id == public_id) {
        await cloudinary.v2.uploader.destroy(public_id)
      }
  } catch (error) {
    console.log("could not file may be not available in server", error);
  }
}
//
