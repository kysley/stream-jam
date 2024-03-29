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

// based on a socket session you are able to look up a userId
// this is to work around socketio handshake being shit and not working
export const rSocketSessionUser = (sessionId: string) =>
	`socketSession:${sessionId}:user`;

export const setSocketSessionUser = async (userId: string): Promise<string> => {
	const uuid = randomUUID();
	await redis.set(rSocketSessionUser(uuid), userId);
	return uuid;
};

export const getSocketUserSession = async (sessionId: string) => {
	return redis.get(rSocketSessionUser(sessionId));
};

export const deleteSocketUserSession = async (sessionId: string) => {
	return redis.del(rSocketSessionUser(sessionId));
};
