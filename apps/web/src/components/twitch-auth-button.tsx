import { BrandTwitch } from "tabler-icons-react";
import { useTwitchAuthLink } from "../hooks/use-twitch-auth-link";

export function TwitchAuthButton() {
  const link = useTwitchAuthLink();
  return (
    <a href={link}>
      <BrandTwitch />
    </a>
  );
}
