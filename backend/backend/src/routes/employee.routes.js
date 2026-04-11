import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const data = await prisma.employee.create({ data: req.body });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET
router.get("/", async (req, res) => {
  const data = await prisma.employee.findMany();
  res.json(data);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const data = await prisma.employee.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await prisma.employee.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ message: "Deleted" });
});

export default router;