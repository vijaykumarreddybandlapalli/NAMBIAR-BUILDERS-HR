import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const data = await prisma.event.create({ data: req.body });
  res.json(data);
});

router.get("/", async (req, res) => {
  const data = await prisma.event.findMany();
  res.json(data);
});

router.put("/:id", async (req, res) => {
  const data = await prisma.event.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  await prisma.event.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ message: "Deleted" });
});

export default router;