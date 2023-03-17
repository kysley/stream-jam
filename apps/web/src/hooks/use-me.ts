import { trpc } from "../utils/trpc";

export function useMe() {
	return trpc.me.useQuery(undefined, {});
}
