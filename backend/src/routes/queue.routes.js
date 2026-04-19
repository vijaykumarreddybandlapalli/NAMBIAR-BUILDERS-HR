import express from "express";

const router = express.Router();

const sampleQueue = [
  { id: 1, status: "scheduled", type: "birthday" },
  { id: 2, status: "sent", type: "anniversary" },
  { id: 3, status: "delivered", type: "event" },
  { id: 4, status: "failed", type: "welcome" },
];

router.get("/", async (req, res) => {
  try {
    res.json(sampleQueue);
  } catch (error) {
    console.error("LOAD QUEUE ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;