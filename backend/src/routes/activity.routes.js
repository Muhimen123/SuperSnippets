import express from "express";
import { logActivityController, getActivitiesForCodebookController } from "../controllers/activity.controller.js";

const router = express.Router();

router.post("/log", logActivityController);
router.get("/:codebookId", getActivitiesForCodebookController);

export default router;   