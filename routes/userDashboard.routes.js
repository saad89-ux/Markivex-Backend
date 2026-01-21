import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import verifyEditor from "../middleware/verifyEditor.js";

import { getEditorDashboard } from "../controllers/userDashboard.controller.js";

const userDashboardrouter = express.Router();


// Editor dashboard
userDashboardrouter.get("/editor", verifyToken, verifyEditor, getEditorDashboard);

export default userDashboardrouter;
