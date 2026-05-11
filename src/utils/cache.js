import redisClient from "../config/redis.js";

export const getCache = async (key) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

export const setCache = async (key, value, seconds = 60) => {
  await redisClient.setEx(key, seconds, JSON.stringify(value));
};

export const deleteCache = async (key) => {
  await redisClient.del(key);
};