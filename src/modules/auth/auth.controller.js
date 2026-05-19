import {
  registerUserService,
  loginUserService,
  verifyEmailService,
  resendVerificationService
} from "./auth.service.js";

import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resendVerificationSchema
} from "./auth.validation.js";

import { createAuditLogService } from "../admin/audit.service.js";

export const register = async (req, res, next) => {
  try {
    const result = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      message: "Registration successful. Please check your email to verify your account.",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = verifyEmailSchema.parse(req.body);
    const user = await verifyEmailService(token);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const resendVerification = async (req, res, next) => {
  try {
    const { email } = resendVerificationSchema.parse(req.body);
    const result = await resendVerificationService(email);

    res.status(200).json({
      success: true,
      message: "Verification token generated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await loginUserService(validatedData);

    await createAuditLogService({
      userId: result.user.id,
      action: "USER_LOGIN",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"]
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  const {
    password,
    emailVerificationToken,
    emailVerificationExpires,
    passwordResetToken,
    passwordResetExpires,
    ...safeUser
  } = req.user;

  res.status(200).json({
    success: true,
    data: safeUser
  });
};