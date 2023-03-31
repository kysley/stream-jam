import { z } from "zod";
import { prisma } from "../../prisma";
import { type t as TRPC } from "../../router";

export const saveMagnet = (t: typeof TRPC) =>
	t.procedure
		.input(
			z.object({
				name: z.string(),
				props: z.any({}).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			if (ctx.user) {
				console.log(input);
				return prisma.magnet.create({
					data: {
						name: input.name,
						props: JSON.stringify(input.props),
						user: {
							connect: {
								id: ctx.user.id,
							},
						},
					},
				});
			}
		});
