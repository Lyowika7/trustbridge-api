import crypto from "crypto";
import prisma from "../config/prisma.js";
import { PLAN_LIMITS } from "../config/plans.js";

const apiKeyMiddleware = async (req, res, next) => {
  try {
    const rawApiKey = req.headers["x-api-key"];

    if (!rawApiKey) {
      return res.status(401).json({
        success: false,
        message: "API key is required"
      });
    }

    const hashedKey = crypto
      .createHash("sha256")
      .update(rawApiKey)
      .digest("hex");

    const existingKey = await prisma.apiKey.findUnique({
      where: {
        key: hashedKey
      },
      include: {
        user: true
      }
    });

    if (!existingKey) {
      return res.status(401).json({
        success: false,
        message: "Invalid API key"
      });
    }

    // Get user's active subscription
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId: existingKey.user.id
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    // Default plan
    const currentPlan = activeSubscription?.plan || "FREE";

    // Plan request limit
    const requestLimit = PLAN_LIMITS[currentPlan];

    // Check request limit
    if (existingKey.requestsCount >= requestLimit) {
      return res.status(429).json({
        success: false,
        message: `You have exceeded your ${currentPlan} plan request limit`
      });
    }

    // Update usage
    await prisma.apiKey.update({
      where: {
        id: existingKey.id
      },
      data: {
        requestsCount: {
          increment: 1
        },
        lastUsedAt: new Date()
      }
    });

    // Log usage
    res.on("finish", async () => {
      try {
        await prisma.apiUsageLog.create({
          data: {
            endpoint: req.originalUrl,
            method: req.method,
            statusCode: res.statusCode,
            ipAddress: req.ip,
            apiKeyId: existingKey.id
          }
        });
      } catch (error) {
        console.error("Usage log error:", error);
      }
    });

    req.apiUser = existingKey.user;
    req.apiKey = existingKey;
    req.subscriptionPlan = currentPlan;

    next();
  } catch (error) {
    next(error);
  }
};

export default apiKeyMiddleware;