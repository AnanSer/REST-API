const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const path = require("path");
const fs = require("fs");

// Add JWT secret key (store this in .env in production)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Add JWT verification middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Middleware
app.use(express.json());

// Debug middleware - log all requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// GET route for events
app.get("/events", verifyToken, (req, res) => {
  console.log("Events route hit");
  try {
    // Send a test response to verify the route works
    res.status(200).json({ message: "Events route is working" });
  } catch (error) {
    console.error("Error in events route:", error);
    res.status(500).json({ error: error.message });
  }
});

// Basic root route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Add this route temporarily for testing
app.post("/generate-test-token", (req, res) => {
  const testUser = { id: 1, email: "test@example.com" };
  const token = jwt.sign(testUser, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Create uploads directory if it doesn't exist
const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
