import express from "express";

import protect from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

import {
  createApiKey,
  getApiKeys,
  deleteApiKey
} from "./developer.controller.js";

const router = express.Router();

router.use(protect);
router.use(authorize("BUSINESS", "ADMIN"));

router.post("/api-keys", createApiKey);
router.get("/api-keys", getApiKeys);
router.delete("/api-keys/:id", deleteApiKey);

export default router;