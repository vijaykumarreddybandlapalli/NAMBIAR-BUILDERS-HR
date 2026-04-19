import express from "express";

const router = express.Router();

router.post("/send-custom", async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    res.json({
      success: true,
      message: "Custom email API working",
      data: { to, subject, message },
    });
  } catch (error) {
    console.error("SEND CUSTOM EMAIL ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/send-employee", async (req, res) => {
  try {
    const { employeeId, type } = req.body;

    res.json({
      success: true,
      message: "Employee email API working",
      data: { employeeId, type },
    });
  } catch (error) {
    console.error("SEND EMPLOYEE EMAIL ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;