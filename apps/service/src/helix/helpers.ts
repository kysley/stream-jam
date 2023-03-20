import { getModerators } from ".";
import { CookieUser } from "../context";
import { redis, userJammingWith } from "../redis";

export async function syncModerators(
	twitchId: string,
	twitchDisplayName: string,
	user: CookieUser,
) {
	const modList = await getModerators(twitchId, user);
	if (modList) {
		await redis.del(
			`user:${twitchId}:moderators`,
			`user:${twitchId}:notifications`,
		);

		// Add self for testing
		await redis.lpush(
			`user:${twitchId}:notifications`,
			`You can now Jam with ${twitchDisplayName}!`,
		);
		await redis.sadd(`user:${twitchId}:jam_with`, twitchId);

		console.log("one or more users seen as moderator of channel");

		for (let i = 0; i <= modList.length - 1; i++) {
			// We add the user id to the moderators list regardless, so we check the existance before
			const isMember = await userJammingWith(twitchId, modList[i].user_id);
			await redis.sadd(`user:${twitchId}:moderators`, modList[i].user_id);

			await redis.sadd(`user:${modList[i].user_id}:jam_with`, twitchId);

			if (!isMember) {
				await redis.lpush(
					`user:${modList[i].user_id}:notifications`,
					`You can now Jam with ${twitchDisplayName}!`,
				);
			}
		}
	}
}
