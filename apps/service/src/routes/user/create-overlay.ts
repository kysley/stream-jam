import { prisma } from "../../prisma";
import { type t as TRPC } from "../../router";
import { GetModeratorsResponse, getModerators } from "../../helix";
import { Overlay } from "@prisma/client";

export const createUserOverlay = (t: typeof TRPC) =>
	t.procedure.mutation<Overlay | null>(async ({ ctx }) => {
		if (ctx.user) {
			const user = await prisma.user.findUniqueOrThrow({
				where: {
					id: ctx.user.id,
				},
			});
			return await prisma.overlay.create({
				data: {
					user: {
						connect: {
							id: user.id,
						},
					},
				},
			});
		}
		return null;
	});
