import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import verifyEditor from "../middleware/verifyEditor.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import {
  createService,
  updateService,
  deleteService,
  getServices,
  getAllServices
} from "../controllers/service.controller.js";

const router = express.Router();

// Public
router.get("/", getServices);

// Editor & Admin
router.get("/all", verifyToken, verifyEditor, getAllServices);
router.post("/", verifyToken, verifyEditor, createService);
router.put("/:id", verifyToken, verifyEditor, updateService);

// Admin only
router.delete("/:id", verifyToken, verifyAdmin, deleteService);

export default router;