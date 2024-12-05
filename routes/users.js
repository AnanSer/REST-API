import express from "express";
import { signup, login } from "../controllers/users-Controller.js";
import db from "../database.js";

const router = express.Router();

// Test route to verify database connection
router.get("/test-db", (req, res) => {
  try {
    db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
      if (err) {
        console.error("Database test failed:", err);
        return res.status(500).json({ error: "Database test failed" });
      }
      res.json({
        message: "Database connection successful",
        userCount: row.count,
        dbPath: db.filename,
      });
    });
  } catch (error) {
    console.error("Database test route error:", error);
    res.status(500).json({ error: "Database test route failed" });
  }
});

// Route for user registration
router.post("/signup", signup);

// Route for user login
router.post("/login", login);

export default router;
