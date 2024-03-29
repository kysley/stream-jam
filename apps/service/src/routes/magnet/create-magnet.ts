import { z } from "zod";
import { prisma } from "../../prisma";
import type { t as TRPC } from "../../router";

export const saveMagnet = (t: typeof TRPC) =>
	t.procedure
		.input(
			z.object({
				name: z.string(),
				props: z.any({}).optional(),
				overlayId: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.user) return;

			const user = await prisma.user.findUniqueOrThrow({
				where: {
					id: ctx.user.id,
				},
			});

			if (!user)
				// no user found
				throw new Error("User not found");

			let hasOverlayAccess = false;
			if (input.overlayId) {
				const overlayExists = await prisma.overlay.findUnique({
					where: {
						id: input.overlayId,
						OR: [
							{
								editors: {
									some: {
										userId: user.id,
									},
								},
							},
							{
								userId: user.id,
							},
						],
					},
				});

				if (!overlayExists)
					throw new Error("Cannot add magnet to overlay without permission");

				hasOverlayAccess = !!overlayExists.id;
			}

			const magnet = await prisma.magnet.create({
				data: {
					name: input.name,
					overlayId:
						hasOverlayAccess && input.overlayId ? input.overlayId : undefined,
					userId: user.id,
					props: JSON.stringify(input.props),
				},
			});

			return magnet;
		});
