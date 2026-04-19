import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

// GET all calendar events
router.get("/", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
    });

    res.json(events);
  } catch (error) {
    console.error("GET CALENDAR EVENTS ERROR:", error);
    res.status(500).json({ error: "Failed to load calendar events" });
  }
});

// CREATE calendar event
router.post("/", async (req, res) => {
  try {
    const { title, date, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({ error: "Title and date are required" });
    }

    const event = await prisma.event.create({
      data: {
        title: String(title).trim(),
        date: new Date(date),
        description: description ? String(description).trim() : "",
      },
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("CREATE CALENDAR EVENT ERROR:", error);
    res.status(500).json({ error: "Failed to create calendar event" });
  }
});

// DELETE calendar event
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid event id" });
    }

    await prisma.event.delete({
      where: { id },
    });

    res.json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("DELETE CALENDAR EVENT ERROR:", error);
    res.status(500).json({ error: "Failed to delete calendar event" });
  }
});

export default router;