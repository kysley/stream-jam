export function useTwitchAuthLink() {
  const BASE_URL = import.meta.env.DEV
    ? "http://localhost:5173/connected"
    : "https://stream-jam.wtf/connected";

  return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=agz91v9ghlkr0as6s5d4jnzv73ftrs&redirect_uri=${BASE_URL}&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&force_verify=true`;
}
