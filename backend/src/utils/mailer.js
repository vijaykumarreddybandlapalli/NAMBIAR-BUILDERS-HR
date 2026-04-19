import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ SAFE VERIFY (no crash / no spam)
async function verifySMTP() {
  try {
    await transporter.verify();
    console.log("✅ SMTP SERVER IS READY");
  } catch (error) {
    console.warn("⚠️ SMTP not configured correctly (email will not send)");
  }
}

// Run once on startup
verifySMTP();

export async function sendMail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"Nambiar Builders" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error.message);
    return null; // don't crash app
  }
}