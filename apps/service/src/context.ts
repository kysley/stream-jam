import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
export async function createContext({ req, res }: CreateFastifyContextOptions) {
  let user;

  if (req.cookies.token) {
    user = await req.jwtVerify<{ id: string }>();
  }

  return { req, res, user };
}
export type Context = inferAsyncReturnType<typeof createContext>;
