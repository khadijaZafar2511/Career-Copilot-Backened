import { v2 as cloudinary } from "cloudinary"
import streamifier from "streamifier"
import dotenv from "dotenv"
dotenv.config({ pah: "./env" });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_COUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE
})


export const uploadStreamToCloudinary = (bufferFile, folder="/Upload") => {
    return new Promise((resolve, reject) => {
        const cldUploadStream = cloudinary.uploader.upload_stream(
          {
            folder: folder,
            resource_type: "auto",
            quality: "auto",
            fetch_format: "auto",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        streamifier.createReadStream(bufferFile).pipe(cldUploadStream)
    })
}