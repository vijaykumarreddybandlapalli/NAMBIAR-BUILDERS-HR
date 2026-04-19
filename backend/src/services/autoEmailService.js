import prisma from "../config/db.js";
import { transporter } from "../config/mailer.js";
import { fillTemplate, getYearsOfService } from "../utils/templateEngine.js";

function isValidDate(dateValue) {
  if (!dateValue) return false;
  const date = new Date(dateValue);
  return !Number.isNaN(date.getTime());
}

function isSameMonthAndDay(dateValue, today) {
  if (!isValidDate(dateValue)) return false;

  const date = new Date(dateValue);

  return (
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

async function saveEmailLog({
  employeeId = null,
  templateId = null,
  template = null,
  emailType,
  toEmail,
  subject,
  content,
  status,
  error = null,
}) {
  try {
    await prisma.emailLog.create({
      data: {
        employeeId,
        templateId,
        template,
        emailType,
        toEmail,
        subject,
        content,
        status,
        error,
      },
    });
  } catch (logError) {
    console.error("❌ EMAIL LOG SAVE ERROR:", logError.message);
  }
}

async function sendMailAndLog({
  employee,
  templateRecord,
  subject,
  html,
  emailType,
}) {
  try {
    await transporter.sendMail({
      from: `"${process.env.COMPANY_NAME || "Nambiar Builders"}" <${process.env.EMAIL_USER}>`,
      to: employee.email,
      subject,
      html,
    });

    await saveEmailLog({
      employeeId: employee.id,
      templateId: templateRecord?.id ?? null,
      template: templateRecord?.name ?? null,
      emailType,
      toEmail: employee.email,
      subject,
      content: html,
      status: "sent",
    });

    console.log(`✅ ${emailType} email sent to ${employee.email}`);
  } catch (error) {
    await saveEmailLog({
      employeeId: employee.id,
      templateId: templateRecord?.id ?? null,
      template: templateRecord?.name ?? null,
      emailType,
      toEmail: employee.email,
      subject,
      content: html,
      status: "failed",
      error: error.message,
    });

    console.error(`❌ ${emailType} email failed for ${employee.email}:`, error.message);
  }
}

export async function runAutoEmailJob() {
  console.log("📩 Running auto email job...");

  try {
    const today = new Date();

    const [employees, birthdayTemplate, anniversaryTemplate] = await Promise.all([
      prisma.employee.findMany(),
      prisma.template.findUnique({ where: { type: "birthday" } }),
      prisma.template.findUnique({ where: { type: "anniversary" } }),
    ]);

    console.log(`👥 Employees found: ${employees.length}`);

    if (!birthdayTemplate) {
      console.log("⚠️ Birthday template not found");
    }

    if (!anniversaryTemplate) {
      console.log("⚠️ Anniversary template not found");
    }

    for (const employee of employees) {
      if (!employee.email) {
        console.log(`⚠️ Skipping employee without email: ${employee.name}`);
        continue;
      }

      const templateData = {
        name: employee.name || "Employee",
        company: process.env.COMPANY_NAME || "Nambiar Builders",
        years: getYearsOfService(employee.joiningDate),
      };

      if (birthdayTemplate && isSameMonthAndDay(employee.dateOfBirth, today)) {
        const subject = fillTemplate(birthdayTemplate.subject, templateData);
        const html = fillTemplate(birthdayTemplate.content, templateData);

        await sendMailAndLog({
          employee,
          templateRecord: birthdayTemplate,
          subject,
          html,
          emailType: "birthday",
        });
      }

      if (anniversaryTemplate && isSameMonthAndDay(employee.joiningDate, today)) {
        const subject = fillTemplate(anniversaryTemplate.subject, templateData);
        const html = fillTemplate(anniversaryTemplate.content, templateData);

        await sendMailAndLog({
          employee,
          templateRecord: anniversaryTemplate,
          subject,
          html,
          emailType: "anniversary",
        });
      }
    }

    console.log("✅ Auto email job finished");
  } catch (error) {
    console.error("❌ AUTO EMAIL JOB ERROR:", error.message);
    throw error;
  }
}