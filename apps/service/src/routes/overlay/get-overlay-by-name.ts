import type { Overlay } from "@prisma/client";
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
			const overlay = await prisma.overlay.findFirstOrThrow({
				where: {
					user: {
						twDisplayName: input.name,
					},
					editors: {
						some: {
							userId: ctx.user.id,
						},
					},
				},
				include: {
					magnets: true,
				},
			});

			return overlay;
		});
