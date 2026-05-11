import "./config/redis.js";
import "./workers/webhook.worker.js";
import "./workers/trustScore.worker.js";
import app from "./app.js";
import env from "./config/env.js";
import prisma from "./config/prisma.js";

const startServer = async () => {
  try {
    await prisma.$connect();

    console.log("Database connected successfully");

    app.listen(env.port, () => {
      console.log(`TrustBridge API running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();