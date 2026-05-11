import { Queue } from "bullmq";
import { queueConnection } from "../config/queue.js";

export const webhookQueue = new Queue("webhook-queue", {
  connection: queueConnection
});

export const addWebhookJob = async ({ userId, event, payload }) => {
  await webhookQueue.add(
    "dispatch-webhook",
    { userId, event, payload },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 3000
      }
    }
  );
};