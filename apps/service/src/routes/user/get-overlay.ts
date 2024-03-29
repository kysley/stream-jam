import { prisma } from "../../prisma";
import type { t as TRPC } from "../../router";
import { GetModeratorsResponse, getModerators } from "../../helix";
import type { Overlay } from "@prisma/client";

export const getUserOverlay = (t: typeof TRPC) =>
	t.procedure.query<Overlay | null>(async ({ ctx }) => {
		if (ctx.user) {
			const user = await prisma.user.findUniqueOrThrow({
				where: {
					id: ctx.user.id,
				},
				include: {
					overlay: true,
					magnets: true,
				},
			});
			return user.overlay;
		}
		return null;
	});
