import User from "../models/User.js";

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
      password, // In production, hash this password using bcrypt
      role: "user",
    });

    // Return user without password
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
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
    if (user.password !== password) {
      throw new Error("Invalid credentials");
    }

    // Return user without password
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
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
        role: "user",
      });
    }

    // Return user without password
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    };
  } catch (error) {
    throw error;
  }
};
