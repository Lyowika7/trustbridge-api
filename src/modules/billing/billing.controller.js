import {
  createSubscriptionService,
  getCurrentSubscriptionService
} from "./billing.service.js";

export const createSubscription = async (req, res, next) => {
  try {
    const { plan } = req.body;

    const subscription = await createSubscriptionService(req.user.id, plan);

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentSubscription = async (req, res, next) => {
  try {
    const subscription = await getCurrentSubscriptionService(req.user.id);

    res.status(200).json({
      success: true,
      message: "Subscription fetched successfully",
      data: subscription
    });
  } catch (error) {
    next(error);
  }
};