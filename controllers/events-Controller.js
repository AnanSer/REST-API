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

  const image = req.file;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!title || !description || !address || !date || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res
      .status(400)
      .json({ message: "Invalid date format. Please use YYYY-MM-DD" });
  }

  try {
    const newEvent = await createEvent({
      title,
      description,
      address,
      date,
      image:image.filename,
      userId: req.user.id,
    });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
}

// Function to handle editing an existing event
export const edit = async (req, res) => {
  const { id } = req.params;
  const { title, description, address, date } = req.body;

  const image = req.file;


  if (!req.user) return res.status(401).json({ message: "Unauthorizedd" });

  const errors = validateEvent({ title, description, address, date });
  if (errors) return res.status(400).json({ message: errors.join(", ") });

  try {
    const event = await getEventById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.user_id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updated = await editEvent(id, { title, description, address, date , image: image.filename});
    if (updated) {
      res.status(200).json({ message: "Event updated successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error editing event:", error);
    res.status(500).json({ message: "Error editing event" });
  }
};

const validateEvent = ({ title, description, address, date }) => {
  const errors = [];
  if (!title || !description || !address || !date )
    errors.push("All fields are required");
  if (
    title.trim() === "" ||
    description.trim() === "" ||
    address.trim() === "" ||
    date.trim() === ""||,
    
    
  )
    errors.push("All fields must have valid values");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
    errors.push("Invalid date format. Please use YYYY-MM-DD");
  return errors;
};
// Function to handle deleting an event
export async function deleteItem(req, res) {
  const eventId = parseInt(req.params.id);

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const event = await getEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.user_id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

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
// Function to handle user registration for an event
export async function register(req, res) {
  const { eventId } = req.params;
  const { userId } = req.user;

  try {
    const event = await getEventById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const result = await registerForEvent(userId, eventId);
    if (result) {
      res
        .status(201)
        .json({ message: "User registered for event successfully" });
    } else {
      res.status(409).json({ message: "User already registered for event" });
    }
  } catch (error) {
    console.error("Error registering user for event:", error);
    res.status(500).json({ message: "Error registering user for event" });
  }
}

// Function to handle user unregistration for an event
export async function unregister(req, res) {
  const { eventId } = req.params;
  const { userId } = req.user;

  try {
    const event = await getEventById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const result = await unregisterFromEvent(userId, eventId);
    if (result) {
      res
        .status(200)
        .json({ message: "User unregistered for event successfully" });
    } else {
      res.status(404).json({ message: "User not registered for event" });
    }
  } catch (error) {
    console.error("Error unregistering user for event:", error);
    res.status(500).json({ message: "Error unregistering user for event" });
  }
}
