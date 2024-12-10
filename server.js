const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Debug middleware - log all requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// GET route for events
app.get("/events", (req, res) => {
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
