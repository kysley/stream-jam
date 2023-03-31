import { ReactQueryOptions, RouterOutputs, trpc } from "../utils/trpc";

type MagnetsOptions = ReactQueryOptions["getMagnets"];

export function useMagnets(opts?: MagnetsOptions) {
	return trpc.getMagnets.useQuery(undefined, {
		...opts,
		select(data) {
			return (
				data?.map((d) => ({
					...d,
					props: JSON.parse(d.props),
				})) || []
			);
		},
	});
}
