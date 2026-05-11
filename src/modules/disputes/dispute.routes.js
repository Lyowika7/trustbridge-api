import express from "express";

import protect from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

import {
  createDispute,
  getAllDisputes,
  getDisputeById,
  updateDisputeStatus,
  deleteDispute
} from "./dispute.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("BUSINESS", "ADMIN"),
  createDispute
);

router.get(
  "/",
  protect,
  authorize("BUSINESS", "ADMIN"),
  getAllDisputes
);

router.get(
  "/:id",
  protect,
  authorize("BUSINESS", "ADMIN"),
  getDisputeById
);

router.patch(
  "/:id/status",
  protect,
  authorize("ADMIN"),
  updateDisputeStatus
);

router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  deleteDispute
);

export default router;