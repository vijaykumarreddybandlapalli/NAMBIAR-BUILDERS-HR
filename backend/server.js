import express from "express";
import cors from "cors";

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

app.get("/api/employees", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@nambiar.com",
      department: "HR",
    },
    {
      id: 2,
      name: "Priya Menon",
      email: "priya@nambiar.com",
      department: "Finance",
    },
  ]);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});