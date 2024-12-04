import express from "express";
import userRoutes from "./routes/users.js";
import db from "./database.js";

const app = express();

// Verify database connection

app.use(express.json());
app.use("/users", userRoutes);

// ... rest of your app.js code ...
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
  try {
    db.prepare("SELECT 1").get();
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
});
