import express from "express";

import protect from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

import {
  createWebhook,
  getWebhooks,
  deleteWebhook
} from "./webhook.controller.js";

const router = express.Router();

router.use(protect);
router.use(authorize("VENDOR", "ADMIN"));

router.post("/", createWebhook);
router.get("/", getWebhooks);
router.delete("/:id", deleteWebhook);

export default router;