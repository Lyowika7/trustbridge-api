import express from "express";

import {
  register,
  login,
  getMe,
  verifyEmail,
  resendVerification
} from "./auth.controller.js";

import protect from "../../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/login", login);
router.get("/me", protect, getMe);

export default router;