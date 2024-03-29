import { Overlay } from "@prisma/client";
import type { t as TRPC } from "../../router";
import { prisma } from "../../prisma";
import { z } from "zod";

export const updateOverlayMagnet = (t: typeof TRPC) =>
	t.procedure
		.input(
			z.object({
				id: z.string(),
				overlayId: z.string(),
				props: z.any({}).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			if (ctx.user) {
				const user = await prisma.user.findUniqueOrThrow({
					where: {
						id: ctx.user.id,
					},
					include: {
						magnets: {
							where: { id: input.id, overlayId: input.overlayId },
						},
					},
				});
				console.log(user);
			}
		});
