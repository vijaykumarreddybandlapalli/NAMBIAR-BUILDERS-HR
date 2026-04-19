import cron from "node-cron";
import prisma from "../config/db.js";
import { sendMail } from "../utils/mailer.js";

function isSameMonthDay(dateValue, today) {
  const date = new Date(dateValue);

  return (
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function startEmailJob() {
  cron.schedule("* * * * *", async () => {
    try {
      console.log("Running daily email job...");

      const employees = await prisma.employee.findMany();
      const today = new Date();

      for (const employee of employees) {
        if (
          employee.dateOfBirth &&
          isSameMonthDay(employee.dateOfBirth, today)
        ) {
          await sendMail({
            to: employee.email,
            subject: `Happy Birthday ${employee.name}!`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Happy Birthday, ${employee.name} 🎉</h2>
                <p>Wishing you a wonderful day filled with happiness and success.</p>
                <p>Best wishes,<br/>Nambiar Builders</p>
              </div>
            `,
          });

          console.log(`Birthday email sent to ${employee.email}`);
        }

        if (
          employee.joiningDate &&
          isSameMonthDay(employee.joiningDate, today)
        ) {
          await sendMail({
            to: employee.email,
            subject: `Happy Work Anniversary ${employee.name}!`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Happy Work Anniversary, ${employee.name} 🏆</h2>
                <p>Thank you for your dedication and contribution to Nambiar Builders.</p>
                <p>Best wishes,<br/>Nambiar Builders</p>
              </div>
            `,
          });

          console.log(`Anniversary email sent to ${employee.email}`);
        }
      }
    } catch (error) {
      console.error("EMAIL JOB ERROR:", error);
    }
  });
}