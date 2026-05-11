import { Queue } from "bullmq";
import { queueConnection } from "../config/queue.js";

export const trustScoreQueue = new Queue("trust-score-queue", {
  connection: queueConnection
});

export const addTrustScoreJob = async (vendorId) => {
  await trustScoreQueue.add(
    "recalculate-trust-score",
    { vendorId },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 3000
      }
    }
  );
};