import { initTRPC } from "@trpc/server";
import wretch from "wretch";
import { z } from "zod";
import { createContext } from "./context";
import { prisma } from "./prisma";
type User = {
  id: string;
  name: string;
  bio?: string;
};
import FormDataAddon from "wretch/addons/formData";

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
      const res = await wretch('"https://id.twitch.tv/oauth2/token"')
        .addon(FormDataAddon)
        .formData({
          client_id: process.env.SJ_CLIENT_ID || "",
          client_secret: process.env.SJ_SECRET || "",
          code: input.code,
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:5173/connected",
        })
        .post();

      // Get the authenticating user using their access token
      const user = await wretch("https://api.twitch.tv/helix/users", {
        headers: {
          // @ts-expect-error
          Authorization: `Bearer ${res.body.access_token}`,
          "Client-ID": process.env.SJ_CLIENT_ID,
        },
      })
        .get()
        .json<{
          data: [{ id: string; login: string; display_name: string }];
        }>();

      const userData = user.data[0];
      if (!userData) return null;
      console.log(userData);

      const prismaUser = await prisma.user.upsert({
        where: {
          twId: userData.id,
        },
        create: {
          twDisplayName: userData.display_name,
          twId: userData.id,
          // @ts-expect-error
          twRefreshToken: res.body.refresh_token,
        },
        update: {
          twDisplayName: userData.display_name,
          // @ts-expect-error
          twRefreshToken: res.body.refresh_token,
        },
      });

      const token = await ctx.res.jwtSign({ id: prismaUser.id });
      ctx.res.setCookie("token", token, {
        secure: true,
        httpOnly: true,
        expires: new Date(new Date().setMonth(12)),
        signed: true,
      });
      return true;
    }),
  me: t.procedure.query(async ({ ctx }) => {
    if (ctx.user) {
      return prisma.user.findUnique({ where: { id: ctx.user.id } });
    }
    return null;
  }),
});
// export type definition of API
export type AppRouter = typeof router;
