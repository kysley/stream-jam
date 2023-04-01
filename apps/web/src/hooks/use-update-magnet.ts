import { trpc } from "../utils/trpc";

export function useUpdateMagnet() {
	return trpc.updateMagnet.useMutation();
}
