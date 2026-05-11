import express from "express";

import protect from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

import {
  createReport,
  getAllReports,
  getReportById,
  updateReportStatus,
  deleteReport
} from "./report.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("BUSINESS", "ADMIN"),
  createReport
);

router.get(
  "/",
  protect,
  authorize("BUSINESS", "ADMIN"),
  getAllReports
);

router.get(
  "/:id",
  protect,
  authorize("BUSINESS", "ADMIN"),
  getReportById
);

router.patch(
  "/:id/status",
  protect,
  authorize("ADMIN"),
  updateReportStatus
);

router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  deleteReport
);

export default router;