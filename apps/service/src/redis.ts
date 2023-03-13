import { Redis } from "ioredis";

export const redis = new Redis({ password: process.env.REDIS_PASSWORD });

export async function userJammingWith(channelTwId: string, userTwId: string) {
	return redis.sismember(`user:${channelTwId}:moderators`, userTwId);
}
