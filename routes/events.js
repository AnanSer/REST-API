import express from "express";
import * as events from "../controllers/events-Controller.js";
import { authenticate } from "../util/auth.js";
import { upload } from "../util/upload.js";
import multer from 'multer';

const router = express.Router();

router.post("/", authenticate, upload.single('image'), events.create);
router.get("/:id", events.getSingle);
router.put("/:id", authenticate, upload.single("image"), events.edit);
router.delete("/:id", authenticate, events.deleteItem);
router.get("/", events.getAll);
router.post("/:id/register", authenticate, events.register);
router.post("/:id/unregister", authenticate, events.unregister);

export default router;
