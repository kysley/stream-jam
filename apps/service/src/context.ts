import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { prisma } from "./prisma";
export async function createContext({ req, res }: CreateFastifyContextOptions) {
  let user;
  if (req.cookies.token) {
    user = await req.jwtVerify<{}>();
  }

  return { req, res, user, prisma };
}
export type Context = inferAsyncReturnType<typeof createContext>;
