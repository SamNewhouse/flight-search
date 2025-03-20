import Redis from "ioredis";

/**
 * Redis Client - Handles caching for improved performance.
 */

export const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
