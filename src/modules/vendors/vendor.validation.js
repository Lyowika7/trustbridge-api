import { z } from "zod";

export const createVendorSchema = z.object({
  businessName: z.string().min(2),
  businessEmail: z.string().email(),
  phoneNumber: z.string().min(7),
  address: z.string().optional(),
  cacNumber: z.string().optional(),
  nin: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional()
});

export const updateVendorSchema = z.object({
  businessName: z.string().min(2).optional(),
  businessEmail: z.string().email().optional(),
  phoneNumber: z.string().min(7).optional(),
  address: z.string().optional(),
  cacNumber: z.string().optional(),
  nin: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional()
});