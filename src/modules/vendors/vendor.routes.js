import express from "express";

import protect from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import apiKeyMiddleware from "../../middlewares/apiKey.middleware.js";

import {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
  getVendorTrustScore
} from "./vendor.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("BUSINESS", "ADMIN"),
  createVendor
);

router.get(
  "/",
  protect,
  authorize("BUSINESS", "ADMIN"),
  getAllVendors
);

router.get(
  "/:id",
  protect,
  authorize("BUSINESS", "ADMIN"),
  getVendorById
);

router.patch(
  "/:id",
  protect,
  authorize("BUSINESS", "ADMIN"),
  updateVendor
);

router.delete(
  "/:id",
  protect,
  authorize("BUSINESS", "ADMIN"),
  deleteVendor
);

router.get(
  "/:id/trust-score",
  apiKeyMiddleware,
  getVendorTrustScore
);

export default router;