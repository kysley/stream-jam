import { getModerators } from ".";
import { CookieUser } from "../context";
import {
	isUserPrivileged,
	rUserModerators,
	rUserPrivileged,
	redis,
} from "../redis";

export async function syncModerators(
	twitchId: string,
	twitchDisplayName: string,
	user: CookieUser,
) {
	const modList = await getModerators(twitchId, user);
	if (modList) {
		await redis.del(
			rUserModerators(twitchId),
			`user:${twitchId}:notifications`,
		);

		// Add self for testing
		await redis.lpush(
			`user:${twitchId}:notifications`,
			`You can now Jam with ${twitchDisplayName}!`,
		);
		await redis.sadd(rUserPrivileged(twitchId), twitchId);

		console.log("one or more users seen as moderator of channel");

		for (let i = 0; i <= modList.length - 1; i++) {
			// We add the user id to the moderators list regardless, so we check the existance before
			const isMemberAlready = await isUserPrivileged(
				twitchId,
				modList[i].user_id,
			);

			// Don't do this by default
			// await redis.sadd(`user:${modList[i].user_id}:privileged`, twitchId);

			if (!isMemberAlready) {
				await redis.sadd(rUserModerators(twitchId), modList[i].user_id);
				await redis.lpush(
					`user:${modList[i].user_id}:notifications`,
					`You can now Jam with ${twitchDisplayName}!`,
				);
			}
		}
	}
}
