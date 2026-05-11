import express from "express";

import protect from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import { getAuditLogs } from "./audit.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorize("ADMIN"),
  async (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
      user: req.user
    });
  }
);

router.get(
  "/audit-logs",
  protect,
  authorize("ADMIN"),
  getAuditLogs
);

export default router;