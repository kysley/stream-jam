import { trpc } from "../utils/trpc";

export function useSaveMagnet() {
	return trpc.saveMagnet.useMutation();
}
