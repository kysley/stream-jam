import { Redis } from "ioredis";

export const redis = new Redis({ password: process.env.REDIS_PASSWORD });

export async function isUserPrivileged(
	haystackTwId: string,
	needleTwId: string,
) {
	return redis.sismember(`user:${haystackTwId}:moderators`, needleTwId);
}

export const rUserModerators = (userId: string) => `user:${userId}:moderators`;

export const rUserPrivileged = (userId: string) => `user:${userId}:privileged`;
