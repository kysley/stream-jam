import { Redis } from "ioredis";

export const redis = new Redis({ password: process.env.REDIS_PASSWORD });
