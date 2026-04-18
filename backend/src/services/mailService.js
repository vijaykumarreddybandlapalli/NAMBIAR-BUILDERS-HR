import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);

export function isMailConfigured() {
  return Boolean(EMAIL_USER && EMAIL_PASS && SMTP_HOST && SMTP_PORT);
}

export function createTransporter() {
  if (!isMailConfigured()) {
    throw new Error("Mail configuration is missing in .env");
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
}

export async function verifyMailer() {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("SMTP connection verified successfully");
    return true;
  } catch (error) {
    console.error("SMTP VERIFY ERROR:", error.message);
    return false;
  }
}

export async function sendEmail({ to, subject, html }) {
  const transporter = createTransporter();

  const info = await transporter.sendMail({
    from: `"Nambiar Builders" <${EMAIL_USER}>`,
    to,
    subject,
    html,
  });

  return info;
}