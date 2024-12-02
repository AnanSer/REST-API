import express from "express";
import userRoutes from "./routes/users.js";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

// ... rest of your app.js code ...
export default app;
