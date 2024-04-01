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

			let hasOverlayId = undefined;
			if (input.overlayId) {
				// try out finding the overlay through a mix of twitch username and editor/user check
				const overlayExists = await prisma.overlay.findFirst({
					where: {
						// id: input.overlayId,
						// AND: {
						user: {
							twDisplayName: input.overlayId,
						},
						// OR: [
						// {
						editors: {
							some: {
								userId: user.id,
							},
							// },
							// },
							// 	{
							// 		userId: user.id,
							// 	},
							// ],
						},
					},
				});

				if (!overlayExists)
					throw new Error("Cannot add magnet to overlay without permission");

				hasOverlayId = overlayExists.id;
			}

			const magnet = await prisma.magnet.create({
				data: {
					name: input.name,
					overlayId: hasOverlayId ?? undefined,
					userId: user.id,
					props: JSON.stringify(input.props),
				},
			});

			return magnet;
		});
