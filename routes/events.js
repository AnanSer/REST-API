import express from "express";
import * as events from "../controllers/events-Controller.js";
import { authenticate } from "../util/auth.js";

const router = express.Router();

router.post("/", authenticate, events.create); // Use the create function
router.get("/:id", events.getSingle); // Use the getSingle function
router.put("/:id", authenticate, events.edit); // Use the edit function
router.delete("/:id", authenticate, events.deleteItem); // Use the deleteItem function
router.get("/", events.getAll); // Optional: Add a route to get all events
export default router;
