import fastifyServer from "fastify";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import cors from "@fastify/cors";
import socketioServer from "fastify-socket.io";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";

import { router } from "./router";
import { createContext } from "./context";
import { createPredictionListener } from "./plugins/prediction-listener";

const fastify = fastifyServer();
fastify.register(cors, {
	// put your options here
	origin: "http://localhost:5173",
	credentials: true,
});

fastify.register(fastifyCookie, {
	secret: process.env.SJ_JWT || "gg",
});

fastify.register(fastifyJwt, {
	secret: process.env.SJ_JWT || "gg",
	cookie: {
		cookieName: "token",
		signed: true,
	},
});

fastify.register(fastifyTRPCPlugin, {
	prefix: "/trpc",
	trpcOptions: {
		router,
		createContext,
	},
});

fastify.register(socketioServer, {
	cors: {
		origin: "http://localhost:5173",
		credentials: true,
		allowedHeaders: ["token"],
	},
	// cookie: {
	//   name: "token",
	//   httpOnly: true,
	// },
});

fastify.get("/", (req, res) => {
	res.code(200).send("yo");
});

(async () => {
	try {
		fastify.ready((e) => {
			if (e) throw e;
			console.log("ready");
			const predictionListener = createPredictionListener(fastify.io, [
				40754777, // "masondota2",
				121059319, //moonmoon
				39726444, //swan_one
			]);
			// fastify.io.use((socket, next) => {
			//   console.log(socket.handshake.headers.cookie);
			//   next();
			// });
			fastify.io.on("connection", (socket) => {
				let roomName: string;
				const cleanup = predictionListener(socket);
				// Can't seem to verify the cookie outside of fastify context
				// const cookie = socket.handshake.headers.cookie;
				// // No cookie? we want OUT
				// if (!cookie) return;

				// // const { token } = fastify.parseCookie(cookie);
				// const token = cookie.split("=")[1];
				// if (!token) return;

				// if the user has a socket session
				// get the user from the session

				// verify that the socket session 1. is the same as the room or 2. is allowed to be in the room

				console.log("connection");
				socket.on("update", (state) => {
					if (roomName) {
						console.log(roomName);
						fastify.io.to(roomName).emit("update", state);
					}
				});

				socket.on("joinRoom", (name: string) => {
					socket.rooms.clear();
					socket.join(name);
					roomName = name;
				});

				socket.on("disconnect", () => {
					console.log("socket disconnect");
					console.log("TODO: remove socket session");
					socket.on("disconnect", cleanup);
					// socket.handshake.auth
				});
			});
		});
		// Setting host for node 19 fix
		await fastify.listen({ port: 3000, host: "0.0.0.0" });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
})();

export type AppRouter = typeof router;
