import express from "express";
import prisma from "../config/db.js";
import { transporter } from "../config/mailer.js";
import { fillTemplate, getYearsOfService } from "../utils/templateEngine.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Email route is working. Use POST to send email."
  });
});

router.post("/send", async (req, res) => {
  try {
    const { to, subject, message, templateType, employeeId } = req.body;

    let finalSubject = subject || "";
    let finalMessage = message || "";

    if (templateType && employeeId) {
      const employee = await prisma.employee.findUnique({
        where: { id: Number(employeeId) }
      });

      const template = await prisma.template.findUnique({
        where: { type: templateType }
      });

      if (!employee || !template) {
        return res.status(404).json({
          success: false,
          error: "Employee or template not found"
        });
      }

      const data = {
        name: employee.name,
        company: process.env.COMPANY_NAME || "Nambiar Builders",
        years: getYearsOfService(employee.joiningDate)
      };

      finalSubject = fillTemplate(template.subject, data);
      finalMessage = fillTemplate(template.content, data);
    }

    if (!to || !finalSubject || !finalMessage) {
      return res.status(400).json({
        success: false,
        error: "to, subject and message are required"
      });
    }

    await transporter.sendMail({
      from: `"${process.env.COMPANY_NAME || "Nambiar Builders"}" <${process.env.EMAIL_USER}>`,
      to,
      subject: finalSubject,
      html: finalMessage
    });

    res.json({
      success: true,
      message: "Email sent successfully"
    });
  } catch (error) {
    console.error("SEND EMAIL ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get("/logs", async (req, res) => {
  try {
    const logs = await prisma.emailLog.findMany({
      orderBy: { sentAt: "desc" }
    });

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;