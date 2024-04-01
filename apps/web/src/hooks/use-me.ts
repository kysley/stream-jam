import { type ReactQueryOptions, trpc } from "../utils/trpc";

export function useMe(opts: ReactQueryOptions["me"] = {}) {
	return trpc.me.useQuery(undefined, opts);
}
