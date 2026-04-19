import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const templates = await prisma.template.findMany({
      orderBy: { id: "desc" },
    });

    res.json(templates);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, type, subject, content } = req.body;

    if (!name || !type || !subject || !content) {
      return res.status(400).json({
        success: false,
        error: "Name, type, subject, and content are required",
      });
    }

    const template = await prisma.template.create({
      data: {
        name,
        type,
        subject,
        content,
      },
    });

    res.status(201).json({
      success: true,
      message: "Template created successfully",
      template,
    });
  } catch (error) {
    console.error("CREATE TEMPLATE ERROR:", error);

    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        error: "Template for this type already exists",
      });
    }

    res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, type, subject, content } = req.body;

    const template = await prisma.template.update({
      where: { id },
      data: { name, type, subject, content },
    });

    res.json({
      success: true,
      message: "Template updated successfully",
      template,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.template.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Template deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;