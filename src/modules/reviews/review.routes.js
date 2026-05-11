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
  authorize("BUSINESS", "ADMIN"),
  createReview
);

router.get(
  "/vendor/:vendorId",
  protect,
  authorize("BUSINESS", "ADMIN"),
  getVendorReviews
);

router.patch(
  "/:id",
  protect,
  authorize("BUSINESS", "ADMIN"),
  updateReview
);

router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  deleteReview
);

export default router;