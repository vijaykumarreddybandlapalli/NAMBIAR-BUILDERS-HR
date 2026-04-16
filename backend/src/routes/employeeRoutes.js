import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

// GET COUNT
router.get("/count", async (req, res) => {
  try {
    const count = await prisma.employee.count();
    res.json({ count });
  } catch (err) {
    console.error("COUNT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    console.log("POST BODY:", req.body);

    const { name, email, department, dateOfBirth, dateOfJoining } = req.body;

    if (!name || !email || !department || !dateOfBirth || !dateOfJoining) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const dob = new Date(dateOfBirth);
    const doj = new Date(dateOfJoining);

    console.log("DOB:", dob);
    console.log("DOJ:", doj);

    if (isNaN(dob.getTime()) || isNaN(doj.getTime())) {
      return res.status(400).json({
        error: "Invalid date format",
      });
    }

    const data = await prisma.employee.create({
      data: {
        name,
        email,
        department,
        dateOfBirth: dob,
        dateOfJoining: doj,
      },
    });

    console.log("EMPLOYEE CREATED:", data);

    res.status(201).json(data);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const data = await prisma.employee.findMany({
      orderBy: { id: "desc" },
    });
    res.json(data);
  } catch (err) {
    console.error("GET ALL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { name, email, department, dateOfBirth, dateOfJoining } = req.body;

    const dob = new Date(dateOfBirth);
    const doj = new Date(dateOfJoining);

    if (isNaN(dob.getTime()) || isNaN(doj.getTime())) {
      return res.status(400).json({
        error: "Invalid date format",
      });
    }

    const data = await prisma.employee.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        email,
        department,
        dateOfBirth: dob,
        dateOfJoining: doj,
      },
    });

    res.json(data);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await prisma.employee.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;