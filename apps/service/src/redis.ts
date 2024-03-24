import { Redis } from "ioredis";
import { randomUUID } from "node:crypto";

export const redis = new Redis({ password: process.env.REDIS_PASSWORD });

export async function isUserPrivileged(
	haystackTwId: string,
	needleTwId: string,
) {
	return redis.sismember(`user:${haystackTwId}:moderators`, needleTwId);
}

export const rUserModerators = (userId: string) => `user:${userId}:moderators`;

export const rUserPrivileged = (userId: string) => `user:${userId}:privileged`;

export const rSocketSessionUser = (sessionId: string) =>
	`socketSession:${sessionId}:user`;

export const setUserSocketSession = async (
	userId: string,
	remove?: boolean,
) => {
	if (remove) {
		await redis.del(rUserSocketSession(userId));
		return;
	}
˝
	const uuid = randomUUID();
	await redis.set(rUserSocketSession(userId), uuid);
	return uuid;
};

export const getUserSocketSession = async (userId: string) => {
	return redis.get(rUserSocketSession(userId));
};
