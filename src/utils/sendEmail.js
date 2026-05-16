import axios from "axios";

const sendEmail = async ({ to, subject, html }) => {
  if (process.env.NODE_ENV === "test") {
    return { messageId: "test-email-skipped" };
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