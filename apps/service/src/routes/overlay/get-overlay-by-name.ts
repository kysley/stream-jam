import { Overlay } from "@prisma/client";
import type { t as TRPC } from "../../router";
import { prisma } from "../../prisma";
import { z } from "zod";

export const getOverlayByName = (t: typeof TRPC) =>
	t.procedure
		.input(z.object({ name: z.string() }))
		.query<Overlay | null>(async ({ ctx, input }) => {
			if (!ctx.user) {
				return;
			}
			return await prisma.user.findUnique({
				where: { twDisplayName: input.name },
				include: {
					magnets: true,
				},
			});
		});
