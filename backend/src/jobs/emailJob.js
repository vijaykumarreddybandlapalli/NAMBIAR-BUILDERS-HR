import cron from "node-cron";
import prisma from "../config/db.js";
import { sendEmail } from "../services/mailService.js";

export const startEmailJob = () => {
  console.log("Email job initialized...");

  cron.schedule("* * * * *", async () => {
    try {
      console.log("Running email job...");

      const employees = await prisma.employee.findMany();
      console.log("Employees found:", employees.length);

      for (const emp of employees) {
        console.log(`Checking employee: ${emp.name}`);

        await sendEmail(
          emp.email,
          "Test Email 🚀",
          `Hello ${emp.name}, this is a test email`
        );

        console.log(`Test email sent to ${emp.email}`);
      }
    } catch (error) {
      console.error("EMAIL JOB ERROR:", error);
    }
  });
};