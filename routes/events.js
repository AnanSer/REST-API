import express from "express";
import * as events from "../controllers/events-Controller.js";
import { authenticate } from "../util/auth.js";
import { upload } from "../util/upload.js";

const router = express.Router();

router.post("/", authenticate, upload.single("image"), events.create); // Use the create function
router.get("/:id", events.getSingle); // Use the getSingle function
router.put("/:id", authenticate, upload.single("image"), events.edit); // Use the edit function
router.delete("/:id", authenticate, events.deleteItem); // Use the deleteItem function
router.get("/", events.getAll); // Optional: Add a route to get all events
router.post("/:id/register", authenticate, events.register);
router.post("/:id/unregister", authenticate, events.unregister);

export default router;
