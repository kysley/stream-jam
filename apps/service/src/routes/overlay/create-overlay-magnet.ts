import { z } from "zod";
import { t } from "../../router";
import { prisma } from "../../prisma";

export const createOverlayMagnet = t.procedure
	.input(
		z.object({
			name: z.string(),
			props: z.any({}).optional(),
			overlayId: z.string(),
		}),
	)
	.mutation(async ({ ctx, input }) => {
		if (!ctx.user) return;

		const user = await prisma.user.findUniqueOrThrow({
			where: {
				id: ctx.user.id,
			},
			include: {
				overlay: {
					select: {
						id: true,
					},
				},
			},
		});

		if (!user) return

    const overlay = await prisma.overlay.findUnique({
      where: {
        
      }
    })

	});
