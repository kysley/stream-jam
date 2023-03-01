import { useState } from "react";
import { trpc } from "../utils/trpc";

export function useRegisterWithTwitch() {
  const [params] = useState(() => new URLSearchParams(window.location.search));
  return trpc.registerWithTwitch.useQuery(
    { code: params.get("code") },
    { enabled: !!params.get("code"), refetchOnWindowFocus: false }
  );
}
