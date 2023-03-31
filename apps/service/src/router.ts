import { initTRPC } from "@trpc/server";
import wretch from "wretch";
import { z } from "zod";
import { createContext } from "./context";
import { prisma } from "./prisma";
import { getAuthorizationCode, getStreams } from "./helix";
import { redis } from "./redis";
import { syncModerators } from "./helix/helpers";
import { saveMagnet, updateMagnet, getMagnets } from "./routes";

export const t = initTRPC.context<typeof createContext>().create();

export const router = t.router({
	registerWithTwitch: t.procedure
		.input(
			z.object({
				code: z.string(),
			}),
		)
		.query(async ({ input, ctx }) => {
			console.log("calling registerWithTwitch");

			const auth = await getAuthorizationCode(input.code);

			// Get the authenticating user using their access token
			const user = await wretch("https://api.twitch.tv/helix/users", {
				headers: {
					// @ts-expect-error
					Authorization: `Bearer ${auth.access_token}`,
					"Client-ID": process.env.SJ_CLIENT_ID,
				},
			})
				.get()
				.json<{
					data: [{ id: string; login: string; display_name: string }];
				}>();

			const userData = user.data[0];
			if (!userData) return null;
			// console.log(userData, auth);

			const prismaUser = await prisma.user.upsert({
				where: {
					twId: userData.id,
				},
				create: {
					twDisplayName: userData.display_name,
					twId: userData.id,
					twRefreshToken: auth.refresh_token,
				},
				update: {
					twDisplayName: userData.display_name,
					twRefreshToken: auth.refresh_token,
				},
			});

			await syncModerators(prismaUser.twId, prismaUser.twDisplayName, {
				accessToken: auth.accessToken,
				id: prismaUser.id,
			});

			const token = await ctx.res.jwtSign({
				id: prismaUser.id,
				accessToken: auth.accessToken,
			});

			ctx.res.setCookie("token", token, {
				secure: true,
				httpOnly: true,
				// expires: new Date() + auth.expires_in * 1000,
				expires: new Date(new Date().setMonth(12)),
				signed: true,
				path: "/",
			});

			return true;
		}),
	me: t.procedure.query(async ({ ctx }) => {
		if (ctx.user) {
			const user = await prisma.user.findUnique({ where: { id: ctx.user.id } });

			if (!user) return null;

			//refresh access token
			// const auth = await refreshAccessToken(user.twRefreshToken);
			// if (!auth) return null;

			// const token = await ctx.res.jwtSign({
			// 	id: user.id,
			// 	accessToken: auth.access_token,
			// });

			// ctx.res.setCookie("token", token, {
			// 	secure: true,
			// 	httpOnly: true,
			// 	// expires: new Date(new Date() + auth.expires_in * 1000),
			// 	expires: new Date(new Date().setMonth(12)),
			// 	signed: true,
			// 	path: "/",
			// });

			return user;
		}
		return null;
	}),
	createSocketSession: t.procedure.mutation(async ({ ctx }) => {
		if (ctx.user) {
			const prismaUser = await prisma.user.findUnique({
				where: { id: ctx.user.id },
			});
			const sessionId = crypto.randomUUID();
			// we should have a different key for this and not use twitch id
			await redis.set(`user:${prismaUser?.twId}:socketSession`, sessionId);

			return sessionId;
		}
	}),
	notifications: t.procedure.query(async ({ ctx }) => {
		if (ctx.user) {
			const prismaUser = await prisma.user.findUnique({
				where: { id: ctx.user.id },
			});
			return redis.lrange(`user:${prismaUser?.twId}:notifications`, 0, -1);
		}
	}),
	jammingWith: t.procedure.query(async ({ ctx }) => {
		if (ctx.user) {
			const prismaUser = await prisma.user.findUnique({
				where: { id: ctx.user.id },
			});
			const jammingTwitchIds = await redis.smembers(
				`user:${prismaUser?.twId}:jam_with`,
			);

			const streams = await getStreams(jammingTwitchIds, ctx.user);
			console.log({ streams });

			const users = await prisma.user.findMany({
				where: { OR: jammingTwitchIds.map((i) => ({ twId: i })) },
			});

			return users.map((user) => ({
				id: user.id,
				name: user.twDisplayName,
				// Cross check if jamming user is live with the users api req
				live: Boolean(
					Math.sqrt(streams.findIndex((s) => s.user_id === user.twId)),
				),
			}));
		}
	}),
	saveMagnet: saveMagnet(t),
	updateMagnet: updateMagnet(t),
	getMagnets: getMagnets(t),

	// syncModerators: t.procedure.mutation(async ({ ctx }) => {
	// 	if (ctx.user) {
	// 		const user = await prisma.user.findUnique({ where: { id: ctx.user.id } });
	// 		if (!user) return null;
	// 		// todo: move this to syncModerators/register procedures
	// 		const modList = await getModerators(user.twId, ctx.user.accessToken);
	// 		if (modList) {
	// 			await redis.del(
	// 				`user:${user.twId}:moderators`,
	// 				`user:${user.twId}:notifications`,
	// 			);

	// 			// Add self for testing
	// 			await redis.lpush(
	// 				`user:${user.twId}:notifications`,
	// 				`You can now Jam with ${user.twDisplayName}!`,
	// 			);
	// 			await redis.sadd(`user:${user.twId}:jam_with`, user.twId);

	// 			console.log("one or more users seen as moderator of channel");

	// 			for (let i = 0; i <= modList.length - 1; i++) {
	// 				// We add the user id to the moderators list regardless, so we check the existance before
	// 				const isMember = await userJammingWith(user.twId, modList[i].user_id);
	// 				await redis.sadd(`user:${user.twId}:moderators`, modList[i].user_id);

	// 				await redis.sadd(`user:${modList[i].user_id}:jam_with`, user.twId);

	// 				if (!isMember) {
	// 					await redis.lpush(
	// 						`user:${modList[i].user_id}:notifications`,
	// 						`You can now Jam with ${user.twDisplayName}!`,
	// 					);
	// 				}
	// 			}
	// 		}
	// 		// ^end
	// 	}
	// }),
});
// export type definition of API
export type AppRouter = typeof router;
