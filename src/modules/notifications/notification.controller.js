import {
  createNotificationService,
  getMyNotificationsService,
  markNotificationAsReadService,
  markAllNotificationsAsReadService,
  deleteNotificationService
} from "./notification.service.js";

export const createNotification = async (req, res, next) => {
  try {
    const notification = await createNotificationService(req.body);

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification
    });
  } catch (error) {
    next(error);
  }
};

export const getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await getMyNotificationsService(req.user.id);

    res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (error) {
    next(error);
  }
};

export const markNotificationAsRead = async (req, res, next) => {
  try {
    const notification = await markNotificationAsReadService(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: notification
    });
  } catch (error) {
    next(error);
  }
};

export const markAllNotificationsAsRead = async (req, res, next) => {
  try {
    await markAllNotificationsAsReadService(req.user.id);

    res.status(200).json({
      success: true,
      message: "All notifications marked as read"
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    await deleteNotificationService(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};