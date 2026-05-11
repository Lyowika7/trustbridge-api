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
  authorize("BUSINESS", "ADMIN"),
  createTransaction
);

router.get(
  "/vendor/:vendorId",
  protect,
  authorize("BUSINESS", "ADMIN"),
  getVendorTransactions
);

router.get(
  "/:id",
  protect,
  authorize("BUSINESS", "ADMIN"),
  getTransactionById
);

router.patch(
  "/:id/status",
  protect,
  authorize("BUSINESS", "ADMIN"),
  updateTransactionStatus
);

export default router;