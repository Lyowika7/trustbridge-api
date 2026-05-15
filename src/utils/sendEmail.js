import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  const smtpIsConfigured =
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.SMTP_FROM;

  if (process.env.NODE_ENV === "test" || !smtpIsConfigured) {
    console.log(`Email skipped: ${to} - ${subject}`);
    return true;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    requireTLS: true,
    family: 4,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
  }); 

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html
  });
};

export default sendEmail;