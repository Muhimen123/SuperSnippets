import {
  createUser,
  authenticateUser,
  handleGoogleAuth,
  checkUserEmailExists,
  verifyResetCode,
  resetPassword,
} from "../services/auth.service.js";
import { sendEmail } from "../services/email.service.js";
import { passwordResetTemplate } from "../utils/email_templates/reset.mail.js";
import User from "../models/User.js";

/**
 * Handle user signup
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Create user
    const user = await createUser({ name, email, password });

    res.status(201).json(user);
  } catch (error) {
    console.error("Signup Error:", error);

    if (error.message === "Email already exists") {
      return res.status(409).json({
        error: error.message,
      });
    }

    res.status(500).json({
      error: "Failed to create user",
      details: error.message,
    });
  }
};

/**
 * Handle user login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Authenticate user
    const user = await authenticateUser({ email, password });

    res.status(200).json(user);
  } catch (error) {
    console.error("Login Error:", error);

    if (error.message === "Invalid credentials") {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    res.status(500).json({
      error: "Failed to authenticate user",
      details: error.message,
    });
  }
};

/**
 * Handle Google OAuth callback
 */
export const googleAuth = async (req, res) => {
  try {
    const { email, name, image, googleId } = req.body;
    console.log("Google Auth Request Body:", req.body);

    // Validate input
    if (!email || !googleId) {
      return res.status(400).json({
        error: "Email and Google ID are required",
      });
    }

    // Handle Google authentication
    const user = await handleGoogleAuth({ email, name, image, googleId });

    res.status(200).json(user);
  } catch (error) {
    console.error("Google Auth Error:", error);

    res.status(500).json({
      error: "Failed to authenticate with Google",
      details: error.message,
    });
  }
};

/**
 * Handle forgot password email verification
 */
export const forgotPassword = async (req, res) => {
  try {
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const email = req.body?.email?.trim()?.toLowerCase();

    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    const exists = await checkUserEmailExists({ email });

    if (!exists) {
      return res.status(404).json({
        error: "Email not found",
      });
    }

    const user = await User.findOne({ email });
    user.passwordResetCode = resetCode;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send reset code email
    const customizedMail = passwordResetTemplate
      .replace("{{name}}", user.name)
      .replace("{{code}}", resetCode);

    await sendEmail({
      to: user.email,
      subject: "Password Reset Code - Super Snippets 🔐",
      html: customizedMail,
    });

    res.status(200).json({
      message: "Password reset code sent to email",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({
      error: "Failed to send password reset code",
      details: error.message,
    });
  }
};

/**
 * Verify password reset code
 */
export const verifyResetCodeController = async (req, res) => {
  try {
    const email = req.body?.email?.trim()?.toLowerCase();
    const code = req.body?.code?.trim();

    if (!email || !code) {
      return res.status(400).json({
        error: "Email and code are required",
      });
    }

    await verifyResetCode({ email, code });

    res.status(200).json({
      message: "Code verified successfully",
    });
  } catch (error) {
    console.error("Verify Reset Code Error:", error);

    if (
      error.message === "User not found" ||
      error.message === "Invalid code" ||
      error.message === "No reset code found"
    ) {
      return res.status(400).json({
        error: "Invalid verification code",
      });
    }

    if (error.message === "Code expired") {
      return res.status(400).json({
        error: "Code has expired. Please request a new one",
      });
    }

    res.status(500).json({
      error: "Failed to verify code",
      details: error.message,
    });
  }
};

/**
 * Reset password with verified code
 */
export const resetPasswordController = async (req, res) => {
  try {
    const email = req.body?.email?.trim()?.toLowerCase();
    const code = req.body?.code?.trim();
    const newPassword = req.body?.password?.trim();

    if (!email || !code || !newPassword) {
      return res.status(400).json({
        error: "Email, code, and new password are required",
      });
    }

    const user = await resetPassword({ email, code, newPassword });

    res.status(200).json({
      message: "Password reset successfully",
      user,
    });
  } catch (error) {
    console.error("Reset Password Error:", error);

    if (
      error.message === "User not found" ||
      error.message === "Invalid code"
    ) {
      return res.status(400).json({
        error: "Invalid verification code",
      });
    }

    if (error.message === "Code expired") {
      return res.status(400).json({
        error: "Code has expired. Please request a new one",
      });
    }

    res.status(500).json({
      error: "Failed to reset password",
      details: error.message,
    });
  }
};
