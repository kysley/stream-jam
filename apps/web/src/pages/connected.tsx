import { useEffect } from "react";
import { useRegisterWithTwitch } from "../hooks/use-register-with-twitch";
import { useSearch, useLocationProperty, navigate } from "wouter/use-location";

export function ConnectedPage() {
  useRegisterWithTwitch();

  return <span>todo: redirect me</span>;
}
