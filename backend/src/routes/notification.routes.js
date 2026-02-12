import express from "express";
import {
  sendInvitation,
  acceptInvitation,
  getUserNotifications,
} from "../controllers/notification.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All notification routes require authentication
router.post("/invite", verifyToken, sendInvitation);
router.post("/accept", verifyToken, acceptInvitation);
router.get("/", verifyToken, getUserNotifications);

export default router;