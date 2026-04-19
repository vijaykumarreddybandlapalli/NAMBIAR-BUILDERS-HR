import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import employeeRoutes from "./routes/employeeRoutes.js";
import eventRoutes from "./routes/event.routes.js";
import templateRoutes from "./routes/template.routes.js";
import emailRoutes from "./routes/email.routes.js";
import queueRoutes from "./routes/queue.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import calendarRoutes from "./routes/calendar.routes.js";

import { startEmailJob } from "./jobs/emailJob.js";
import { verifyMailer } from "./config/mailer.js";
import { runAutoEmailJob } from "./services/autoEmailService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
  });
});

app.use("/api/employees", employeeRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/email-queue", queueRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/calendar", calendarRoutes);

app.get("/api/run-auto-email-now", async (req, res) => {
  try {
    await runAutoEmailJob();

    res.json({
      success: true,
      message: "Auto email job executed successfully",
    });
  } catch (error) {
    console.error("RUN AUTO EMAIL ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await verifyMailer();
  startEmailJob();
});