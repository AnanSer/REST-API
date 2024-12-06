/*************  ✨ Codeium Command ⭐  *************/
import express from "express";
import {
  createEvent,
  editEvent,
  deleteEvent,
} from "../controllers/event-controller.js";

const router = express.Router();

router.post("/", createEvent);
router.put("/:id", editEvent);
router.delete("/:id", deleteEvent);

export default router;
/******  dd6b6fec-353a-41cb-b49d-f97fdbf3093e  *******/
