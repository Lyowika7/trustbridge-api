import express from "express";

import protect from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

import {
  createSupportTicket,
  getMySupportTickets,
  getAllSupportTickets,
  updateSupportTicketStatus,
  addSupportTicketMessage
} from "./support.controller.js";

const router = express.Router();

router.post(
  "/tickets",
  protect,
  authorize("CUSTOMER", "VENDOR", "ADMIN"),
  createSupportTicket
);

router.get(
  "/tickets/my",
  protect,
  authorize("CUSTOMER", "VENDOR", "ADMIN"),
  getMySupportTickets
);

router.get(
  "/tickets",
  protect,
  authorize("ADMIN"),
  getAllSupportTickets
);

router.patch(
  "/tickets/:id/status",
  protect,
  authorize("ADMIN"),
  updateSupportTicketStatus
);

router.post(
  "/tickets/:id/messages",
  protect,
  authorize("CUSTOMER", "VENDOR", "ADMIN"),
  addSupportTicketMessage
);

export default router;