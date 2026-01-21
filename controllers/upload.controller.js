import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

export const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        message: "No image provided" 
      });
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "markivex/single"
    );

    res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Upload failed: " + error.message 
    });
  }
};

export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        message: "No images provided" 
      });
    }

    const uploadResults = await Promise.all(
      req.files.map((file) =>
        uploadToCloudinary(file.buffer, "markivex/portfolio")
      )
    );

    const images = uploadResults.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }));

    res.status(201).json({
      message: "Images uploaded successfully",
      images,
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Upload failed: " + error.message 
    });
  }
};