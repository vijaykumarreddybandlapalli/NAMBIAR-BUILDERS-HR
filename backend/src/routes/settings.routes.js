import express from "express";

const router = express.Router();

let settings = {
  primaryFromEmail: "hr@nambiarbuilders.com",
  sendTime: "09:00",
  welcomeMailDay: "Monday",
};

router.get("/", async (req, res) => {
  try {
    res.json(settings);
  } catch (error) {
    console.error("LOAD SETTINGS ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    settings = { ...settings, ...req.body };

    res.json({
      success: true,
      message: "Settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;