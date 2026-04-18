import cron from "node-cron";
import prisma from "../config/db.js";
import { sendEmail, verifyMailer, isMailConfigured } from "../services/mailService.js";

function isSameMonthDay(dateValue, today) {
  if (!dateValue) return false;

  const date = new Date(dateValue);
  return (
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

async function runEmailJob() {
  try {
    console.log("Running email job...");

    if (!isMailConfigured()) {
      console.log("Email skipped: .env mail settings are missing");
      return;
    }

    const smtpOk = await verifyMailer();
    if (!smtpOk) {
      console.log("Email skipped: SMTP login failed");
      return;
    }

    const employees = await prisma.employee.findMany();
    console.log("Employees found:", employees.length);

    const today = new Date();

    for (const employee of employees) {
      console.log("Checking employee:", employee.name);

      if (isSameMonthDay(employee.dateOfBirth, today)) {
        console.log("Preparing to send birthday email to:", employee.email);

        try {
          await sendEmail({
            to: employee.email,
            subject: "Happy Birthday from Nambiar Builders",
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Happy Birthday ${employee.name} 🎉</h2>
                <p>Wishing you a wonderful year ahead.</p>
                <p>Regards,<br/>Nambiar Builders Pvt Ltd</p>
              </div>
            `,
          });

          console.log("Birthday email sent successfully to:", employee.email);
        } catch (error) {
          console.error("SEND EMAIL ERROR:", error.message);
        }
      }

      if (isSameMonthDay(employee.dateOfJoining, today)) {
        console.log("Preparing to send anniversary email to:", employee.email);

        try {
          await sendEmail({
            to: employee.email,
            subject: "Happy Work Anniversary from Nambiar Builders",
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Happy Work Anniversary ${employee.name} 🎉</h2>
                <p>Thank you for being part of Nambiar Builders.</p>
                <p>Regards,<br/>Nambiar Builders Pvt Ltd</p>
              </div>
            `,
          });

          console.log("Anniversary email sent successfully to:", employee.email);
        } catch (error) {
          console.error("SEND EMAIL ERROR:", error.message);
        }
      }
    }
  } catch (error) {
    console.error("EMAIL JOB ERROR:", error.message);
  }
}

export function startEmailJob() {
  console.log("Email job initialized...");

  cron.schedule("* * * * *", async () => {
    await runEmailJob();
  });
}