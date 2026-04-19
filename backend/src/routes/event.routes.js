import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
    });

    return res.json(events);
  } catch (error) {
    console.error("LOAD EVENTS ERROR:", error);
    return res.status(500).json({
      error: "Failed to load events",
    });
  }
});

// CREATE event
router.post("/", async (req, res) => {
  try {
    const { title, date, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({
        error: "Event name and date are required",
      });
    }

    const event = await prisma.event.create({
      data: {
        title: title.trim(),
        date: new Date(date),
        description: description ? description.trim() : "",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);
    return res.status(500).json({
      error: "Failed to create event",
    });
  }
});

// UPDATE event
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({
        error: "Event name and date are required",
      });
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id: Number(id) },
    });

    if (!existingEvent) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    const updatedEvent = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        title: title.trim(),
        date: new Date(date),
        description: description ? description.trim() : "",
      },
    });

    return res.json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);
    return res.status(500).json({
      error: "Failed to update event",
    });
  }
});

// DELETE event
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const existingEvent = await prisma.event.findUnique({
      where: { id: Number(id) },
    });

    if (!existingEvent) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    await prisma.event.delete({
      where: { id: Number(id) },
    });

    return res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("DELETE EVENT ERROR:", error);
    return res.status(500).json({
      error: "Failed to delete event",
    });
  }
});

export default router;