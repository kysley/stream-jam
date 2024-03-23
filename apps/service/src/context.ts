import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export type CookieUser = {
	id: string;
	accessToken: string;
};

export async function createContext({ req, res }: CreateFastifyContextOptions) {
	let user;

	if (req.cookies.token) {
		user = await req.jwtVerify<CookieUser>();
	}

	return { req, res, user };
}
export type Context = inferAsyncReturnType<typeof createContext>;
