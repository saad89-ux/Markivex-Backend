import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Use cloudinary.uploader.upload
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "markivex/single",
    });

    // Delete local file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: "Upload successful",
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed: " + error.message });
  }
};

export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: "No files uploaded" });

    const uploadedImages = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "markivex/multiple",
      });
      uploadedImages.push({ url: result.secure_url, publicId: result.public_id });

      fs.unlinkSync(file.path);
    }

    res.status(201).json({
      message: "Images uploaded successfully",
      images: uploadedImages,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed: " + error.message });
  }
};
