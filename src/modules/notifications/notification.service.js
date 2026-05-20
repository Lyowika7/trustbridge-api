import prisma from "../../config/prisma.js";

import { getIO } from "../../config/socket.js";

export const createNotificationService = async (data) => {
  const user = await prisma.user.findUnique({
    where: { id: data.userId }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const notification = await prisma.notification.create({
    data: {
      title: data.title,
      message: data.message,
      userId: data.userId
    }
  });

  try {
    const io = getIO();

    io.to(data.userId).emit("notification:new", {
      id: notification.id,
      title: notification.title,
      message: notification.message,
      isRead: notification.isRead,
      createdAt: notification.createdAt
    });
  } catch (error) {
    console.error("Socket notification error:", error.message);
  }

  return notification;
};

export const getMyNotificationsService = async (userId) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
};

export const markNotificationAsReadService = async (id, userId) => {
  const notification = await prisma.notification.findFirst({
    where: { id, userId }
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  return prisma.notification.update({
    where: { id },
    data: { isRead: true }
  });
};

export const markAllNotificationsAsReadService = async (userId) => {
  await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true }
  });

  return true;
};

export const deleteNotificationService = async (id, userId) => {
  const notification = await prisma.notification.findFirst({
    where: { id, userId }
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  await prisma.notification.delete({
    where: { id }
  });

  return true;
};