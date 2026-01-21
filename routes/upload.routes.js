import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import verifyEditor from "../middleware/verifyEditor.js";
import upload from "../middleware/upload.js";
import {
  uploadSingleImage,
  uploadMultipleImages
} from "../controllers/upload.controller.js";

const router = express.Router();

// All upload routes require auth
router.use(verifyToken);
router.use(verifyEditor);

// Single image upload
router.post(
  "/image",
  upload.single("image"),
  uploadSingleImage
);

// Multiple images upload
router.post(
  "/images",
  upload.array("images", 10),
  uploadMultipleImages
);

export default router;