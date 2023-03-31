import { Magnet } from "@prisma/client";
import { prisma } from "../../prisma";
import { type t as TRPC } from "../../router";

export const getMagnets = (t: typeof TRPC) =>
	t.procedure.query<Magnet[] | null>(async ({ ctx }) => {
		if (ctx.user) {
			return prisma.magnet.findMany({
				where: {
					userId: ctx.user.id,
				},
			});
		}
		return null;
	});
