import { Worker } from "bullmq";
import axios from "axios";
import prisma from "../config/prisma.js";
import { queueConnection } from "../config/queue.js";

export const webhookWorker = new Worker(
  "webhook-queue",
  async (job) => {
    const { userId, event, payload } = job.data;

    const webhooks = await prisma.webhook.findMany({
      where: {
        userId,
        event,
        isActive: true
      }
    });

    for (const webhook of webhooks) {
      await axios.post(webhook.url, {
        event,
        payload,
        timestamp: new Date().toISOString()
      });
    }
  },
  {
    connection: queueConnection
  }
);

webhookWorker.on("completed", (job) => {
  console.log(`Webhook job completed: ${job.id}`);
});

webhookWorker.on("failed", (job, err) => {
  console.error(`Webhook job failed: ${job?.id}`, err.message);
});