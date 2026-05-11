import prisma from "../../config/prisma.js";

export const createSubscriptionService = async (userId, plan) => {
  const allowedPlans = ["FREE", "STARTER", "BUSINESS", "ENTERPRISE"];

  if (!allowedPlans.includes(plan)) {
    throw new Error("Invalid subscription plan");
  }

  const startsAt = new Date();
  const endsAt = new Date();
  endsAt.setMonth(endsAt.getMonth() + 1);

  const subscription = await prisma.subscription.create({
    data: {
      userId,
      plan,
      startsAt,
      endsAt
    }
  });

  return subscription;
};

export const getCurrentSubscriptionService = async (userId) => {
  const subscription = await prisma.subscription.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  return subscription || {
    plan: "FREE",
    startsAt: null,
    endsAt: null
  };
};