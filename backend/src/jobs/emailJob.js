import cron from "node-cron";
import dotenv from "dotenv";
import { runAutoEmailJob } from "../services/autoEmailService.js";

dotenv.config();

export function startEmailJob() {
  const cronTime = process.env.CRON_TIME || "0 9 * * *";

  // Validate cron expression
  if (!cron.validate(cronTime)) {
    console.error("❌ Invalid CRON_TIME in .env:", cronTime);
    return;
  }

  console.log("⏰ Starting Email Cron Job...");
  console.log(`📅 Schedule: ${cronTime}`);

  cron.schedule(cronTime, async () => {
    console.log("🚀 Cron triggered at:", new Date().toLocaleString());

    try {
      await runAutoEmailJob();
      console.log("✅ Cron job completed successfully");
    } catch (error) {
      console.error("❌ CRON JOB ERROR:", error.message);
    }
  });
}