// event-Controller.js

import {
  createEvent,
  editEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
} from "../models/event.js";

// Function to handle creating a new event
export async function create(req, res) {
  const { title, description, address, date } = req.body;

  try {
    const newEvent = await createEvent(title, description, address, date);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Error creating event" });
  }
}

// Function to handle editing an existing event
export async function edit(req, res) {
  const eventId = parseInt(req.params.id);
  const updatedData = req.body;

  try {
    const updated = await editEvent(eventId, updatedData);
    if (updated) {
      res.status(200).json({ message: "Event updated successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error editing event:", error);
    res.status(500).json({ message: "Error editing event" });
  }
}

// Function to handle deleting an event
export async function deleteItem(req, res) {
  const eventId = parseInt(req.params.id);

  try {
    const deleted = await deleteEvent(eventId);
    if (deleted) {
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Error deleting event" });
  }
}

// Function to handle getting all events
export async function getAll(req, res) {
  try {
    const events = await getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error retrieving events:", error);
    res.status(500).json({ message: "Error retrieving events" });
  }
}

// Function to handle getting a single event by ID
export async function getSingle(req, res) {
  const eventId = parseInt(req.params.id);

  try {
    const event = await getEventById(eventId);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error retrieving event:", error);
    res.status(500).json({ message: "Error retrieving event" });
  }
}
