import { initTRPC } from "@trpc/server";
import wretch from "wretch";
import { z } from "zod";
import { createContext } from "./context";
import { prisma } from "./prisma";
import {
  getAuthorizationCode,
  getModerators,
  refreshAccessToken,
} from "./helix";

export const t = initTRPC.context<typeof createContext>().create();
export const router = t.router({
  registerWithTwitch: t.procedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      console.log("calling registerWithTwitch");

      const auth = await getAuthorizationCode(input.code);

      // Get the authenticating user using their access token
      const user = await wretch("https://api.twitch.tv/helix/users", {
        headers: {
          // @ts-expect-error
          Authorization: `Bearer ${auth.access_token}`,
          "Client-ID": process.env.SJ_CLIENT_ID,
        },
      })
        .get()
        .json<{
          data: [{ id: string; login: string; display_name: string }];
        }>();

      const userData = user.data[0];
      if (!userData) return null;
      // console.log(userData, auth);

      const prismaUser = await prisma.user.upsert({
        where: {
          twId: userData.id,
        },
        create: {
          twDisplayName: userData.display_name,
          twId: userData.id,
          twRefreshToken: auth.refresh_token,
        },
        update: {
          twDisplayName: userData.display_name,
          twRefreshToken: auth.refresh_token,
        },
      });

      const token = await ctx.res.jwtSign({
        id: prismaUser.id,
        accessToken: auth.accessToken,
      });
      ctx.res.setCookie("token", token, {
        secure: true,
        httpOnly: true,
        // expires: new Date() + auth.expires_in * 1000,
        expires: new Date(new Date().setMonth(12)),
        signed: true,
      });

      return true;
    }),
  me: t.procedure.query(async ({ ctx }) => {
    if (ctx.user) {
      const user = await prisma.user.findUnique({ where: { id: ctx.user.id } });

      if (!user) return null;

      //refresh access token
      const auth = await refreshAccessToken(user?.twRefreshToken);
      if (!auth) return null;

      const modList = await getModerators(user?.twId, auth.access_token);

      if (modList) {
        // await redis.sadd(
        //   `user:${user?.twDisplayName}:mods`,
        //   modList.map((m) => m.user_id)
        // );
      }

      const token = await ctx.res.jwtSign({
        id: user.id,
        accessToken: auth.access_token,
      });
      ctx.res.setCookie("token", token, {
        secure: true,
        httpOnly: true,
        // expires: new Date(new Date() + auth.expires_in * 1000),
        expires: new Date(new Date().setMonth(12)),
        signed: true,
      });

      return user;
    }
    return null;
  }),
  syncModerators: t.procedure.mutation(async ({ ctx }) => {
    if (ctx.user) {
    }
  }),
});
// export type definition of API
export type AppRouter = typeof router;
