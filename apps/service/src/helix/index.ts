import wretch from "wretch";
import FormDataAddon from "wretch/addons/formData";
import QueryStringAddon from "wretch/addons/queryString";

const w = wretch().addon(FormDataAddon);

type GetModeratorsResponse = {
	data: [{ user_id: string; user_login: string; user_name: string }];
};

export async function getModerators(twitch_id: string, access_token: string) {
	const mods = await w
		.url(
			`https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=${twitch_id}`,
		)
		.headers({
			Authorization: `Bearer ${access_token}`,
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
export async function refreshAccessToken(refreshToken: string) {
	const res = await wretch("https://id.twitch.tv/oauth2/token")
		.addon(FormDataAddon)
		.formData({
			client_id: process.env.SJ_CLIENT_ID || "",
			client_secret: process.env.SJ_SECRET || "",
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		})
		.post()
		.json<RefreshAccessTokenResponse>();

	return res;
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
export async function getStreams(twitchIds: string[], access_token: string) {
	const streams = await w
		.url("https://api.twitch.tv/helix/streams")
		.addon(QueryStringAddon)
		.query({ user_id: twitchIds })
		.headers({
			Authorization: `Bearer ${access_token}`,
			"Client-ID": process.env.SJ_CLIENT_ID || "",
		})
		.get()
		.json<GetStreamsResponse>();

	// console.log(mods);
	return streams.data;
}
