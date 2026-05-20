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
  getVendorTrustScore,
  getMyVendor,
  updateMyVendor,
  getTopRatedVendors,
  searchVendors
} from "./vendor.controller.js";

const router = express.Router();

router.get("/top-rated", getTopRatedVendors);
router.get("/search", searchVendors);

router.get(
  "/me",
  protect,
  authorize("VENDOR", "ADMIN"),
  getMyVendor
);

router.patch(
  "/me",
  protect,
  authorize("VENDOR", "ADMIN"),
  updateMyVendor
);

router.post(
  "/",
  protect,
  authorize("VENDOR", "ADMIN"),
  createVendor
);

router.get(
  "/",
  protect,
  authorize("CUSTOMER", "VENDOR", "ADMIN"),
  getAllVendors
);

router.get("/top-rated", getTopRatedVendors);
router.get("/search", searchVendors);

router.get(
  "/:id",
  protect,
  authorize("CUSTOMER", "VENDOR", "ADMIN"),
  getVendorById
);

router.patch(
  "/:id",
  protect,
  authorize("VENDOR", "ADMIN"),
  updateVendor
);

router.delete(
  "/:id",
  protect,
  authorize("VENDOR", "ADMIN"),
  deleteVendor
);

router.get(
  "/:id/trust-score",
  apiKeyMiddleware,
  getVendorTrustScore
);

export default router;