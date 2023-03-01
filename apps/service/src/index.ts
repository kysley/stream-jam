import fastifyServer from "fastify";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import socketioServer from "fastify-socket.io";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";

import { router } from "./router";
import { createContext } from "./context";

dotenv.config();

const fastify = fastifyServer();

fastify.register(fastifyJwt, {
  secret: process.env.SJ_JWT || "gg",
  cookie: {
    cookieName: "token",
    signed: true,
  },
});
fastify.register(fastifyCookie);

fastify.register(cors, {
  // put your options here
  origin: "http://localhost:5173",
  credentials: true,
});

fastify.register(socketioServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
  // cookie: {
  //   name: "token",
  //   httpOnly: true,
  // },
});

fastify.get("/", (req, res) => {
  res.code(200).send("yo");
});

fastify.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router,
    createContext,
  },
});

// fastify.addHook("onRequest", (req) => req.jwtVerify());

(async () => {
  try {
    fastify.ready((e) => {
      if (e) throw e;
      console.log("ready");
      fastify.io.on("connection", (socket) => {
        console.log("connection");
        socket.join("moonmoon");
        socket.on("update", (state) => {
          console.log(state);
          fastify.io.to("moonmoon").emit("update", state);
        });
      });
    });
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();

export type AppRouter = typeof router;

// export type { AppRouter } from "./router";

// export const fastify = fastifyServer();

// fastify.register(fastifyCookie, {
//   secret: "123098",
//   // hook: "onRequest",
// });

// fastify.register(fastifyJwt, {
//   secret: "123098",
//   cookie: {
//     cookieName: "token",
//     signed: false,
//   },
// });

// export const CONNECTED_SOCKETS = new Map();

// const fourCharCode = () =>
//   Math.random().toString(36).substr(2, 4).toUpperCase();
