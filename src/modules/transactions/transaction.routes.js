import express from "express";

import protect from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

import {
  createTransaction,
  getVendorTransactions,
  getTransactionById,
  updateTransactionStatus
} from "./transaction.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("VENDOR", "ADMIN"),
  createTransaction
);

router.get(
  "/vendor/:vendorId",
  protect,
  authorize("VENDOR", "ADMIN"),
  getVendorTransactions
);

router.get(
  "/:id",
  protect,
  authorize("VENDOR", "ADMIN"),
  getTransactionById
);

router.patch(
  "/:id/status",
  protect,
  authorize("VENDOR", "ADMIN"),
  updateTransactionStatus
);

export default router;