import prisma from "../../config/prisma.js";

export const createWebhookService = async (userId, data) => {
  return prisma.webhook.create({
    data: {
      url: data.url,
      event: data.event,
      userId
    }
  });
};

export const getWebhooksService = async (userId) => {
  return prisma.webhook.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
};

export const deleteWebhookService = async (id, userId) => {
  const webhook = await prisma.webhook.findFirst({
    where: { id, userId }
  });

  if (!webhook) {
    throw new Error("Webhook not found");
  }

  await prisma.webhook.delete({
    where: { id }
  });

  return true;
};