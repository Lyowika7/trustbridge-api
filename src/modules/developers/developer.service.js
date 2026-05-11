import crypto from "crypto";
import prisma from "../../config/prisma.js";

const generateApiKey = () => {
  const rawKey = `tb_live_${crypto.randomBytes(32).toString("hex")}`;

  const hashedKey = crypto
    .createHash("sha256")
    .update(rawKey)
    .digest("hex");

  return { rawKey, hashedKey };
};

export const createApiKeyService = async (userId, name) => {
  const { rawKey, hashedKey } = generateApiKey();

  const apiKey = await prisma.apiKey.create({
    data: {
      name,
      key: hashedKey,
      userId
    }
  });

  return {
    id: apiKey.id,
    name: apiKey.name,
    apiKey: rawKey,
    createdAt: apiKey.createdAt
  };
};

export const getApiKeysService = async (userId) => {
  return prisma.apiKey.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      createdAt: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const deleteApiKeyService = async (userId, keyId) => {
  const apiKey = await prisma.apiKey.findFirst({
    where: {
      id: keyId,
      userId
    }
  });

  if (!apiKey) {
    throw new Error("API key not found");
  }

  await prisma.apiKey.delete({
    where: { id: keyId }
  });

  return true;
};