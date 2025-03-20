import Redis from "ioredis";

/**
 * Redis Client - Handles caching for improved performance.
 */

export const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export async function getCache(key: string) {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCache(key: string, value: unknown, ttl: number = 300) {
  await redis.set(key, JSON.stringify(value), "EX", ttl); // Default: 5 min expiry
}

export async function clearCache(key: string) {
  await redis.del(key);
}

export default redis;
