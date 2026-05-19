import axios from "axios";

const sendEmail = async ({ to, subject, html }) => {
  if (
    process.env.NODE_ENV === "test" ||
    process.env.SKIP_EMAIL === "true"
  ) {
    console.log(`Email skipped: ${to} - ${subject}`);
    return { messageId: "test-email-skipped" };
  }

  if (
    !process.env.BREVO_API_KEY ||
    !process.env.BREVO_SENDER_EMAIL
  ) {
    console.log("Brevo credentials missing. Email skipped.");
    return { messageId: "missing-brevo-config" };
  }

  const response = await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: {
        name: "TrustBridge",
        email: process.env.BREVO_SENDER_EMAIL
      },
      to: [{ email: to }],
      subject,
      htmlContent: html
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
};

export default sendEmail;