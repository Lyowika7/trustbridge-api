import { Worker } from "bullmq";
import { queueConnection } from "../config/queue.js";
import { calculateTrustScoreService } from "../modules/trustScore/trustScore.service.js";

export const trustScoreWorker = new Worker(
  "trust-score-queue",
  async (job) => {
    const { vendorId } = job.data;

    await calculateTrustScoreService(vendorId);
  },
  {
    connection: queueConnection
  }
);

trustScoreWorker.on("completed", (job) => {
  console.log(`Trust score job completed: ${job.id}`);
});

trustScoreWorker.on("failed", (job, err) => {
  console.error(`Trust score job failed: ${job?.id}`, err.message);
});