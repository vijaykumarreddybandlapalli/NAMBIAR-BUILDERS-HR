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

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/email-queue", queueRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});