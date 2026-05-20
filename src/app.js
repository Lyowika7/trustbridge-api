import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./config/swagger.js";
import env from "./config/env.js";
import { securityMiddleware } from "./middlewares/security.middleware.js";
import { generalLimiter } from "./middlewares/rateLimit.middleware.js";
import billingRoutes from "./modules/billing/billing.routes.js";
import reviewRoutes from "./modules/reviews/review.routes.js";
import transactionRoutes from "./modules/transactions/transaction.routes.js";
import disputeRoutes from "./modules/disputes/dispute.routes.js";
import documentRoutes from "./modules/documents/document.routes.js";
import notificationRoutes from "./modules/notifications/notification.routes.js";
import webhookRoutes from "./modules/webhooks/webhook.routes.js"; 
import supportRoutes from "./modules/support/support.routes.js";   
import notFoundMiddleware from "./middlewares/notFound.middleware.js"; 
import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import developerRoutes from "./modules/developers/developer.routes.js";
import vendorRoutes from "./modules/vendors/vendor.routes.js";
import reportRoutes from "./modules/reports/report.routes.js"; 

const app = express();

app.use(securityMiddleware);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(generalLimiter);

if (env.nodeEnv === "development") {
  app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TrustBridge API is running",
    environment: env.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/developers", developerRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/disputes", disputeRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;