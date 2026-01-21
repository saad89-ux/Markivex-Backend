import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import verifyEditor from "../middleware/verifyEditor.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonials,
  getAllTestimonials
} from "../controllers/testimonial.controller.js";

const router = express.Router();

// Public
router.get("/", getTestimonials);

// Editor & Admin
router.get("/all", verifyToken, verifyEditor, getAllTestimonials);
router.post("/", verifyToken, verifyEditor, createTestimonial);
router.put("/:id", verifyToken, verifyEditor, updateTestimonial);

// Admin only
router.delete("/:id", verifyToken, verifyAdmin, deleteTestimonial);

export default router;