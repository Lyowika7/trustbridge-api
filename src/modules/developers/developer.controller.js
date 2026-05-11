import {
  createApiKeyService,
  getApiKeysService,
  deleteApiKeyService
} from "./developer.service.js";

export const createApiKey = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new Error("API key name is required");
    }

    const result = await createApiKeyService(req.user.id, name);

    res.status(201).json({
      success: true,
      message: "API key created successfully. Copy it now, it will not be shown again.",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getApiKeys = async (req, res, next) => {
  try {
    const apiKeys = await getApiKeysService(req.user.id);

    res.status(200).json({
      success: true,
      message: "API keys fetched successfully",
      data: apiKeys
    });
  } catch (error) {
    next(error);
  }
};

export const deleteApiKey = async (req, res, next) => {
  try {
    await deleteApiKeyService(req.user.id, req.params.id);

    res.status(200).json({
      success: true,
      message: "API key deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};