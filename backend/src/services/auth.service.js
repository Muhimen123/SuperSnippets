import User from "../models/User.js";
import bcrypt from "bcrypt";

/**
 * Create a new user with email and password
 */
export const createUser = async ({ name, email, password }) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10), // In production, hash this password using bcrypt
    });

    // Return user without password
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Authenticate user with email and password
 */
export const authenticateUser = async ({ email, password }) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // In production, use bcrypt.compare(password, user.password)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Return user without password
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Create or update user from Google OAuth
 */
export const handleGoogleAuth = async ({ email, name, image, googleId }) => {
  try {
    // Check if user exists by email or googleId
    let user = await User.findOne({
      $or: [{ email }, { googleId }],
    });

    if (user) {
      // Update existing user with Google info
      user.name = name;
      user.image = image;
      user.googleId = googleId;
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        googleId,
        image,
      });
    }

    // Return user without password
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Check if a user exists by email
 */
export const checkUserEmailExists = async ({ email }) => {
  try {
    const user = await User.findOne({ email }).select("_id");
    return Boolean(user);
  } catch (error) {
    throw error;
  }
};

/**
 * Verify password reset code
 */
export const verifyResetCode = async ({ email, code }) => {
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.passwordResetCode) {
      throw new Error("No reset code found");
    }

    if (user.passwordResetCode !== code) {
      throw new Error("Invalid code");
    }

    if (user.passwordResetExpires < Date.now()) {
      throw new Error("Code expired");
    }

    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Reset user password
 */
export const resetPassword = async ({ email, code, newPassword }) => {
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.passwordResetCode || user.passwordResetCode !== code) {
      throw new Error("Invalid code");
    }

    if (user.passwordResetExpires < Date.now()) {
      throw new Error("Code expired");
    }

    // Update password and clear reset code
    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetCode = null;
    user.passwordResetExpires = null;
    await user.save();

    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  } catch (error) {
    throw error;
  }
};
