import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,    // same as in your .env
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Export cloudinary itself (not only uploader)
export default cloudinary;
