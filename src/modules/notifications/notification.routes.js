import express from "express";

import protect from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

import {
  createNotification,
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification
} from "./notification.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("ADMIN"),
  createNotification
);

router.get(
  "/",
  protect,
  getMyNotifications
);

router.patch(
  "/read-all",
  protect,
  markAllNotificationsAsRead
);

router.patch(
  "/:id/read",
  protect,
  markNotificationAsRead
);

router.delete(
  "/:id",
  protect,
  deleteNotification
);

export default router;