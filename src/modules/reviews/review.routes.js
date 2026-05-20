import express from "express";

import protect from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

import {
  createReview,
  getVendorReviews,
  updateReview,
  deleteReview
} from "./review.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("CUSTOMER", "ADMIN"),
  createReview
);

router.get(
  "/vendor/:vendorId",
  protect,
  authorize("CUSTOMER", "VENDOR", "ADMIN"),
  getVendorReviews
);

router.patch(
  "/:id",
  protect,
  authorize("CUSTOMER", "ADMIN"),
  updateReview
);

router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  deleteReview
);

export default router;