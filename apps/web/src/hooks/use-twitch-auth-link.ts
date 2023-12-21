export function useTwitchAuthLink() {
	const BASE_URL = import.meta.env.DEV
		? "http://localhost:5173/connected"
		: "https://stream-jam.wtf/connected";

	return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=agz91v9ghlkr0as6s5d4jnzv73ftrs&redirect_uri=${BASE_URL}&scope=channel:read:subscriptions+channel:read:predictions+moderator:read:followers&force_verify=true`;
}
