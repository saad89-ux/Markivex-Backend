import express from "express";
import verifyToken from "../middleware/verifyToken.js"; // your auth
import verifyEditor from "../middleware/verifyEditor.js"; // optional
import upload from "../middleware/upload.js";
import { uploadSingleImage, uploadMultipleImages } from "../controllers/upload.controller.js";

const router = express.Router();

// Apply auth
router.use(verifyToken);
router.use(verifyEditor);

// Single image
router.post("/image", upload.single("image"), uploadSingleImage);

// Multiple images
router.post("/images", upload.array("images", 10), uploadMultipleImages);

export default router;
