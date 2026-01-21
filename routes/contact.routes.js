import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import verifyEditor from "../middleware/verifyEditor.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import {
  submitContact,
  getAllContacts,
  updateContactStatus,
  deleteContact
} from "../controllers/contact.controller.js";

const router = express.Router();

// Public
router.post("/", submitContact);

// Editor & Admin
router.get("/", verifyToken, verifyEditor, getAllContacts);
router.put("/:id/status", verifyToken, verifyEditor, updateContactStatus);

// Admin only
router.delete("/:id", verifyToken, verifyAdmin, deleteContact);

export default router;