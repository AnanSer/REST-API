import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users-Controller.js";

const router = express.Router();

// Route for user registration
router.post("/signup", signup);

// Route for user login
router.post("/login", login);

export default router;
