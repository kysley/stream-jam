import { initTRPC } from "@trpc/server";
import p from "phin";
import { z } from "zod";
import { Context, createContext } from "./context";
type User = {
  id: string;
  name: string;
  bio?: string;
};
const users: Record<string, User> = {};
export const t = initTRPC.context<typeof createContext>().create();
export const router = t.router({
  getUserById: t.procedure.input(z.string()).query(({ input }) => {
    return users[input]; // input type is string
  }),
  registerWithTwitch: t.procedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      console.log("calling registerWithTwitch");
      const res = await p({
        url: "https://id.twitch.tv/oauth2/token",
        method: "POST",
        parse: "json",
        form: {
          client_id: process.env.SJ_CLIENT_ID || "",
          client_secret: process.env.SJ_SECRET || "",
          code: input.code,
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:5173/connected",
        },
      });

      // Get the authenticating user using their access token
      const user = await p<{
        data: [{ id: string; login: string; display_name: string }];
      }>({
        url: "https://api.twitch.tv/helix/users",
        method: "GET",
        parse: "json",
        headers: {
          Authorization: `Bearer ${res.body.access_token}`,
          "Client-ID": process.env.SJ_CLIENT_ID,
        },
      });

      console.log(user.body);
      // const token = await ctx.res.jwtSign({ accountId: "" });
      // ctx.res.setCookie("token", token, {
      //   secure: true,
      //   httpOnly: true,
      //   signed: true,
      // });
      console.log(res.body);
      return res.body;
    }),
  createUser: t.procedure
    .input(
      z.object({
        name: z.string().min(3),
        bio: z.string().max(142).optional(),
      })
    )
    .mutation(({ input }) => {
      const id = Date.now().toString();
      const user: User = { id, ...input };
      users[user.id] = user;
      return user;
    }),
});
// export type definition of API
export type AppRouter = typeof router;
