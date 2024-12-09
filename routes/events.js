import express from "express";
import * as events from "./event-Controller.js"; // Import all functions as an object

const router = express.Router();

router.post("/events", events.create); // Use the create function
router.get("/events/:id", events.getSingle); // Use the getSingle function
router.put("/events/:id", events.edit); // Use the edit function
router.delete("/events/:id", events.deleteItem); // Use the deleteItem function
router.get("/events", events.getAll); // Optional: Add a route to get all events

export default router;
