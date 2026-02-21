import express from "express";
import {
  sendInvitation,
  acceptInvitation,
  getUserNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

// Ideally, add authMiddleware here
router.post("/invite", sendInvitation);
router.post("/accept", acceptInvitation);
router.post("/", getUserNotifications);

export default router;