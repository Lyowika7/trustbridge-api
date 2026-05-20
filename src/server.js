import "./config/redis.js";
import "./workers/webhook.worker.js";
import "./workers/trustScore.worker.js";

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import env from "./config/env.js";
import prisma from "./config/prisma.js";
import { initSocket } from "./config/socket.js";

const startServer = async () => {
  try {
    await prisma.$connect();

    console.log("Database connected successfully");

    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: env.clientUrl || "*",
        credentials: true
      }
    });

    initSocket(io);

    server.listen(env.port, () => {
      console.log(`TrustBridge API running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();