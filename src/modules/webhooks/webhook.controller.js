import {
  createWebhookService,
  getWebhooksService,
  deleteWebhookService
} from "./webhook.service.js";

export const createWebhook = async (req, res, next) => {
  try {
    const webhook = await createWebhookService(req.user.id, req.body);

    res.status(201).json({
      success: true,
      message: "Webhook created successfully",
      data: webhook
    });
  } catch (error) {
    next(error);
  }
};

export const getWebhooks = async (req, res, next) => {
  try {
    const webhooks = await getWebhooksService(req.user.id);

    res.status(200).json({
      success: true,
      data: webhooks
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWebhook = async (req, res, next) => {
  try {
    await deleteWebhookService(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Webhook deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};