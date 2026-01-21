import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import {
  getAdminDashboard
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/admin", verifyToken, verifyAdmin, getAdminDashboard);

export default router;
