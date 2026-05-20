import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["CUSTOMER", "VENDOR"]).optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const verifyEmailSchema = z.object({
  token: z.string().min(10)
});

export const resendVerificationSchema = z.object({
  email: z.string().email()
});