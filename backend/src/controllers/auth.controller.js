import {
  createUser,
  authenticateUser,
  handleGoogleAuth,
} from "../services/auth.service.js";

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
