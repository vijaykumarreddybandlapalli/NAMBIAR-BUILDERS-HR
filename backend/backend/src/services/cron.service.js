import cron from "node-cron";
import prisma from "../config/db.js";
import { sendEmail } from "./email.service.js";

export const startCronJobs = () => {
  cron.schedule("0 9 * * *", async () => {
    const today = new Date();

    const employees = await prisma.employee.findMany();

    for (let emp of employees) {
      const dob = new Date(emp.dob);

      if (
        dob.getDate() === today.getDate() &&
        dob.getMonth() === today.getMonth()
      ) {
        await sendEmail(
          emp.email,
          "Happy Birthday 🎉",
          `Happy Birthday ${emp.name}!`
        );
      }
    }

    console.log("Birthday emails checked");
  });
};