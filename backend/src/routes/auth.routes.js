import express from "express";
import { signup, login, googleAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup); // Create new user account
router.post("/login", login); // Authenticate existing user
router.post("/google", googleAuth); // Handle Google OAuth

export default router;
