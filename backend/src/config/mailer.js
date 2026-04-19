import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const smtpPort = Number(process.env.SMTP_PORT || 587);

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function verifyMailer() {
  try {
    await transporter.verify();
    console.log("✅ SMTP SERVER IS READY");
    return true;
  } catch (error) {
    console.error("❌ SMTP VERIFY ERROR:", error.message);
    return false;
  }
}