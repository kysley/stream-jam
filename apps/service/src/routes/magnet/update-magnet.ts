import { z } from "zod";
import { prisma } from "../../prisma";
import { type t as TRPC } from "../../router";

export const updateMagnet = (t: typeof TRPC) =>
	t.procedure
		.input(
			z.object({
				id: z.string(),
				props: z.any({}).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			if (ctx.user) {
				console.log(input);
				return prisma.user.update({
					where: {
						id: ctx.user.id,
					},
					data: {
						magnets: {
							update: {
								where: {
									id: input.id,
								},
								data: {
									props: JSON.stringify(input.props),
								},
							},
						},
					},
				});
				// return prisma.magnet.update({
				// 	where: {
				// 		id: input.id,
				// 	},
				// 	data: {

				// 		props: JSON.stringify(input.props),
				// 		user: {
				// 			connect: {
				// 				id: ctx.user.id,
				// 			},
				// 		},
				// 	},
				// });
			}
		});
