import express from "express";
import prisma from "../config/db.js";
import { runAutoEmailJob } from "../services/autoEmailService.js";

const router = express.Router();

const normalizeStatus = (value) => {
  const status = String(value || "").toLowerCase();

  if (status === "scheduled") return "scheduled";
  if (status === "sent") return "sent";
  if (status === "delivered") return "delivered";
  if (status === "failed") return "failed";

  return "scheduled";
};

// GET full queue
router.get("/", async (req, res) => {
  try {
    const logs = await prisma.emailLog.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        employee: true,
      },
    });

    const formattedLogs = logs.map((log) => ({
      id: log.id,
      to: log.toEmail || "-",
      subject: log.subject || "-",
      type: log.template || log.templateId || "-",
      status: normalizeStatus(log.status),
      error: log.error || "",
      sentAt: log.sentAt || null,
      employeeName: log.employee?.name || "-",
      employeeId: log.employeeId || null,
    }));

    res.json(formattedLogs);
  } catch (error) {
    console.error("LOAD QUEUE ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to load email queue",
    });
  }
});

// GET queue summary counts
router.get("/summary", async (req, res) => {
  try {
    const logs = await prisma.emailLog.findMany({
      select: {
        status: true,
      },
    });

    const summary = {
      scheduled: 0,
      sent: 0,
      delivered: 0,
      failed: 0,
      total: logs.length,
    };

    for (const item of logs) {
      const status = normalizeStatus(item.status);
      summary[status] += 1;
    }

    res.json(summary);
  } catch (error) {
    console.error("QUEUE SUMMARY ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to load queue summary",
    });
  }
});

// RUN scheduled emails now
router.post("/send-scheduled", async (req, res) => {
  try {
    await runAutoEmailJob();

    res.json({
      success: true,
      message: "Scheduled emails processed successfully",
    });
  } catch (error) {
    console.error("SEND SCHEDULED EMAILS ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to process scheduled emails",
    });
  }
});

export default router;