import express from "express";

import protect from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

import {
  uploadDocument,
  getVendorDocuments,
  verifyDocument,
  deleteDocument
} from "./document.controller.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  authorize("VENDOR", "ADMIN"),
  uploadDocument
);

router.get(
  "/vendor/:vendorId",
  protect,
  authorize("VENDOR", "ADMIN"),
  getVendorDocuments
);

router.patch(
  "/:id/verify",
  protect,
  authorize("ADMIN"),
  verifyDocument
);

router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  deleteDocument
);

export default router;