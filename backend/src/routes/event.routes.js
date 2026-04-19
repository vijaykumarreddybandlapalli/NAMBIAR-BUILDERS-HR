import express from "express";
import prisma from "../config/db.js";
import { sendMail } from "../utils/mailer.js";

const router = express.Router();

// Optional browser test
router.get("/send-custom", (req, res) => {
  res.json({ message: "send-custom route is working. Use POST request here." });
});

router.get("/send-employee", (req, res) => {
  res.json({ message: "send-employee route is working. Use POST request here." });
});

// SEND CUSTOM EMAIL
router.post("/send-custom", async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({
        error: "To, subject and message are required",
      });
    }

    await sendMail({
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <p>${message}</p>
        </div>
      `,
    });

    res.json({
      success: true,
      message: "Custom email sent successfully",
    });
  } catch (error) {
    console.error("SEND CUSTOM EMAIL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// SEND EMPLOYEE EMAIL
router.post("/send-employee", async (req, res) => {
  try {
    const { employeeId, type } = req.body;

    if (!employeeId || !type) {
      return res.status(400).json({
        error: "employeeId and type are required",
      });
    }

    const employee = await prisma.employee.findUnique({
      where: { id: Number(employeeId) },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    let subject = "";
    let html = "";

    if (type === "birthday") {
      subject = `Happy Birthday ${employee.name}!`;
      html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Happy Birthday, ${employee.name} 🎉</h2>
          <p>Wishing you a wonderful day filled with happiness and success.</p>
          <p>Best wishes,<br/>Nambiar Builders</p>
        </div>
      `;
    } else if (type === "anniversary") {
      subject = `Happy Work Anniversary ${employee.name}!`;
      html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Happy Work Anniversary, ${employee.name} 🏆</h2>
          <p>Thank you for your dedication and contribution to Nambiar Builders.</p>
          <p>Best wishes,<br/>Nambiar Builders</p>
        </div>
      `;
    } else {
      return res.status(400).json({ error: "Invalid email type" });
    }

    await sendMail({
      to: employee.email,
      subject,
      html,
    });

    res.json({
      success: true,
      message: `${type} email sent successfully`,
    });
  } catch (error) {
    console.error("SEND EMPLOYEE EMAIL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;