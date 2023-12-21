import { AppTokenAuthProvider, StaticAuthProvider } from "@twurple/auth";

export function makeAuthProvider() {
	// process.env.node_env = "development";
	// if (process.env.NODE_ENV === "production") {
	const authProvider = new AppTokenAuthProvider(
		process.env.SJ_CLIENT_ID || "",
		process.env.SJ_SECRET || "",
	);

	return authProvider;
}
// const authProvider = new StaticAuthProvider(
// 	process.env.TW_CLIENT_ID || "",
// 	process.env.TW_ACCESS_TOKEN || "",
// 	[
// 		"moderator:read:followers",
// 		"user:read:follows",
// 		"user:read:subscriptions",
// 		"channel:read:subscriptions",
// 		"chat:edit",
// 		"chat:read",
// 	],
// );

// return authProvider;
// }
