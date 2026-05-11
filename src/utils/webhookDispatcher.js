import axios from "axios";
import prisma from "../config/prisma.js";

export const dispatchWebhook = async ({
  userId,
  event,
  payload
}) => {
  const webhooks = await prisma.webhook.findMany({
    where: {
      userId,
      event,
      isActive: true
    }
  });

  for (const webhook of webhooks) {
    try {
      await axios.post(webhook.url, {
        event,
        payload,
        timestamp: new Date().toISOString()
      });

      console.log(`Webhook sent to ${webhook.url}`);
    } catch (error) {
      console.error(
        `Webhook failed for ${webhook.url}:`,
        error.message
      );
    }
  }
};