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

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP VERIFY ERROR:", error.message);
  } else {
    console.log("SMTP SERVER IS READY");
  }
});

export async function sendMail({ to, subject, html }) {
  return transporter.sendMail({
    from: `"Nambiar Builders" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}