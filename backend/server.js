import "dotenv/config";

import { startEmailJob } from "./src/jobs/emailJob.js";
import express from "express";
import cors from "cors";
import employeeRoutes from "./src/routes/employeeRoutes.js";

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

startEmailJob();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});