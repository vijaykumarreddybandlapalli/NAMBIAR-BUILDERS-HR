import "dotenv/config";
import express from "express";
import cors from "cors";

import employeeRoutes from "./routes/employeeRoutes.js";
import eventRoutes from "./routes/event.routes.js";
import templateRoutes from "./routes/template.routes.js";
import { startEmailJob } from "./jobs/emailJob.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/employees", employeeRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/templates", templateRoutes);

startEmailJob();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});