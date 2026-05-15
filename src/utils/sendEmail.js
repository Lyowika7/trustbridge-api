import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  if (process.env.NODE_ENV === "test") {
    return { messageId: "test-email-skipped" };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    requireTLS: true,
    family: 4,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html
  });
};

export default sendEmail;