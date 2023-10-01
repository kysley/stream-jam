import { prisma } from "../../prisma";
import { type t as TRPC } from "../../router";
import { GetModeratorsResponse, getModerators } from "../../helix";

export const getUserModerators = (t: typeof TRPC) =>
	t.procedure.query<GetModeratorsResponse["data"] | null>(async ({ ctx }) => {
		if (ctx.user) {
			const user = await prisma.user.findUniqueOrThrow({
				where: {
					id: ctx.user.id,
				},
			});
			return getModerators(user.twId, ctx.user);
		}
		return null;
	});
