import express from "express";

import protect from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

import {
  createSubscription,
  getCurrentSubscription
} from "./billing.controller.js";

const router = express.Router();

router.use(protect);
router.use(authorize("BUSINESS", "ADMIN"));

router.post("/subscriptions", createSubscription);
router.get("/subscriptions/current", getCurrentSubscription);

export default router;