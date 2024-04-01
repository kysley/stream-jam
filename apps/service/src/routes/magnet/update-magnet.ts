import { z } from "zod";
import { prisma } from "../../prisma";
import type { t as TRPC } from "../../router";

export const updateMagnet = (t: typeof TRPC) =>
	t.procedure
		.input(
			z.object({
				id: z.string(),
				props: z.any({}).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.user) return;
			const user = await prisma.user.findUniqueOrThrow({
				where: {
					id: ctx.user.id,
				},
			});

			const magnet = await prisma.magnet.update({
				where: {
					id: input.id,
					userId: user.id,
				},
				data: {
					props: JSON.stringify(input.props),
				},
			});

			return magnet;
		});
