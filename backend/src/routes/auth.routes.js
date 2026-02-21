import express from "express";
import {
  signup,
  login,
  googleAuth,
  forgotPassword,
  verifyResetCodeController,
  resetPasswordController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup); // Create new user account
router.post("/login", login); // Authenticate existing user
router.post("/google", googleAuth); // Handle Google OAuth
router.post("/forgot-password", forgotPassword); // Verify email for password reset
router.post("/verify-reset-code", verifyResetCodeController); // Verify reset code
router.post("/reset-password", resetPasswordController); // Reset password with code

export default router;
