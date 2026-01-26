import express from "express";
import { sendWelcomeMail } from "../controllers/email.controller.js";

const router = express.Router();

router.post("/welcome", sendWelcomeMail); // Send welcome message to the new user

export default router;
