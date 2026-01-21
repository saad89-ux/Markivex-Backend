import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import verifyEditor from "../middleware/verifyEditor.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPortfolios,
  getAllPortfolios
} from "../controllers/portfolio.controller.js";

const router = express.Router();

// Public
router.get("/", getPortfolios);

// Editor & Admin
router.get("/all", verifyToken, verifyEditor, getAllPortfolios);
router.post("/", verifyToken, verifyEditor, createPortfolio);
router.put("/:id", verifyToken, verifyEditor, updatePortfolio);

// Admin only
router.delete("/:id", verifyToken, verifyAdmin, deletePortfolio);

export default router;