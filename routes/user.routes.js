import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import { 
  createEditor, 
  getAllEditors, 
  deleteEditor 
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(verifyToken);
router.use(verifyAdmin);

router.post("/editor", createEditor);
router.get("/editors", getAllEditors);
router.delete("/editor/:id", deleteEditor);

export default router;