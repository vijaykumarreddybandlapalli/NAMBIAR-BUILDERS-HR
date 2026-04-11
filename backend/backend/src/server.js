import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import employeeRoutes from "./routes/employee.routes.js";
import templateRoutes from "./routes/template.routes.js";
import eventRoutes from "./routes/event.routes.js";
import { startCronJobs } from "./services/cron.service.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/employees", employeeRoutes);
app.use("/templates", templateRoutes);
app.use("/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

// Start cron
startCronJobs();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});