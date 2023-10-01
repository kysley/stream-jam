import wretch from "wretch";
import FormDataAddon from "wretch/addons/formData";
import QueryStringAddon from "wretch/addons/queryString";
import { CookieUser } from "../context";
import { prisma } from "../prisma";

const w = wretch().addon(FormDataAddon);

export type GetModeratorsResponse = {
	data: { user_id: string; user_login: string; user_name: string }[];
};

export async function getModerators(twitch_id: string, user: CookieUser) {
	const mods = await w
		.url(
			`https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=${twitch_id}`,
		)
		.headers({
			Authorization: `Bearer ${user.accessToken}`,
			"Client-ID": process.env.SJ_CLIENT_ID || "",
		})
		.get()
		.json<GetModeratorsResponse>();

	// console.log(mods);
	return mods.data;
}

type RefreshAccessTokenResponse = {
	access_token: string;
	refresh_token: string;
	scope: string[];
	token_type: string;
};
export async function refreshAccessToken(user: CookieUser) {
	const prismaUser = await prisma.user.findUnique({ where: { id: user.id } });
	if (prismaUser) {
		const res = await wretch("https://id.twitch.tv/oauth2/token")
			.addon(FormDataAddon)
			.formData({
				client_id: process.env.SJ_CLIENT_ID || "",
				client_secret: process.env.SJ_SECRET || "",
				grant_type: "refresh_token",
				refresh_token: prismaUser.twRefreshToken,
			})
			.post()
			.json<RefreshAccessTokenResponse>();

		return res;
	}
}

type GetAuthorizationCodeResponse = {
	accessToken: string;
	expires_in: number;
	refresh_token: string;
	scope: string[];
	token_type: string;
};
export async function getAuthorizationCode(code: string) {
	const res = await wretch("https://id.twitch.tv/oauth2/token")
		.addon(FormDataAddon)
		.formData({
			client_id: process.env.SJ_CLIENT_ID || "",
			client_secret: process.env.SJ_SECRET || "",
			code: code,
			grant_type: "authorization_code",
			redirect_uri: "http://localhost:5173/connected",
		})
		.post()
		.json<GetAuthorizationCodeResponse>();

	return res;
}

type GetStreamsResponse = {
	data: [
		{ user_id: string; user_login: string; user_name: string; type: string },
	];
};

/** Returns a list of LIVE streams based on the specified twitchIds */
export async function getStreams(twitchIds: string[], user: CookieUser) {
	const streams = await w
		.url("https://api.twitch.tv/helix/streams")
		.addon(QueryStringAddon)
		.query({ user_id: twitchIds })
		.headers({
			Authorization: `Bearer ${user.accessToken}`,
			"Client-ID": process.env.SJ_CLIENT_ID || "",
		})
		.get()
		.unauthorized(async (err, request) => {
			const auth = await refreshAccessToken(user);
			return request
				.headers({
					Authorization: `Bearer ${auth?.access_token}`,
					"Client-ID": process.env.SJ_CLIENT_ID || "",
				})
				.fetch()
				.unauthorized((err) => {
					throw err;
				})
				.json();

			// refreshAccessToken()
			// const token = await wretch("/renewtoken").get().text();
			// request.
			// storeToken(token);
			// // Replay the original request with new credentials
			// return request.auth(token).fetch().unauthorized((err) => {
			// throw err;
		})
		.json<GetStreamsResponse>();
	// console.log(streams);
	// console.log(mods);
	return streams.data;
}
