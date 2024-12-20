import {
  createUser,
  findUserByEmail,
  verifyCredentials,
} from "../models/user.js";
import { generateToken } from "../util/auth.js";

async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    console.log("Signup attempt with email:", email);

    // Validate all fields are present and not empty/whitespace
    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return res
        .status(400)
        .json({ message: "All fields are required and cannot be empty" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Check if email is already taken
    const existingUser = await findUserByEmail(email);
    console.log("Existing user check:", existingUser);

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email address is already registered" });
    }

    // Create new user
    const newUser = await createUser({ username, email, password });

    // Generate JWT token
    const token = generateToken(newUser);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error creating user" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for email:", email);

    // Basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Verify credentials
    const user = await verifyCredentials(email, password);
    console.log("Verification result:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error details:", error);
    res.status(500).json({
      message: "Error logging in",
      details: error.message,
    });
  }
}

export { signup, login };
