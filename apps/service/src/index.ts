import fastifyServer from "fastify";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import cors from "@fastify/cors";
import socketioServer from "fastify-socket.io";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";

import TES from "tesjs";

import { router } from "./router";
import { createContext } from "./context";
import { createPredictionListener } from "./plugins/prediction-listener";
import { createSubscriptionListener } from "./plugins/sub-listener";
import { AppTokenAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";
import {
	DirectConnectionAdapter,
	EventSubHttpListener,
} from "@twurple/eventsub-http";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { NgrokAdapter } from "@twurple/eventsub-ngrok";
import { makeAuthProvider } from "./twitch";
import { log } from "console";

export const TEST_CHANNEL_IDS = [
	"31688366", // sym
	"40754777", // "masondota2",
	"121059319", //moonmoon
	"39726444", //swan_one
	"71092938", // xqc
];

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
		fastify.ready(async (e) => {
			if (e) throw e;
			console.log("ready");

			// because of PORT in .env, run ngrok to 3009 in this case
			const tes = new TES({
				identity: {
					id: process.env.SJ_CLIENT_ID,
					secret: process.env.SJ_SECRET, //do not ship this in plaintext!! use environment variables so this does not get exposed
				},
				listener: {
					type: "webhook",
					// baseURL: "https://example.com",
					// this changes every time. see testing-events.md
					baseURL:
						"https://ead6-2001-1970-488b-a200-51fc-9a46-2bd8-8e4b.ngrok-free.app",
					secret: process.env.TES_WEBHOOK_SECRET,
				},
			});

			tes.on("channel.subscribe", (event) => {
				log(event);
				// console.log(`${event.broadcaster_user_name}'s new title is ${event.title}`);
			});

			// create a new subscription for the `channel.update` event for broadcaster "1337"
			tes
				.subscribe("channel.subscribe", {
					broadcaster_user_id: TEST_CHANNEL_IDS[3],
				})
				.then(() => {
					console.log("Subscription successful");
				})
				.catch((err) => {
					console.log(err);
				});

			// const authProvider = makeAuthProvider();

			// const apiClient = new ApiClient({ authProvider });

			// await apiClient.eventSub.deleteAllSubscriptions();

			// const eventSubHttp = new EventSubHttpListener({
			// 	apiClient,
			// 	adapter: new NgrokAdapter({ port: 3000 }),
			// 	secret: "tStrinatedFuldBheneryGisShoiARaexedndomlg",
			// });
			// const eventSubApi = new EventSubWsListener({ apiClient });

			// const cli = await eventSubHttp
			// 	.onChannelSubscription(TEST_CHANNEL_IDS[0], console.log)
			// 	.getCliTestCommand();
			// log(cli);

			// await apiClient.eventSub.deleteAllSubscriptions();
			// const setupSubscriptionListener = createSubscriptionListener(
			// 	fastify.io,
			// 	eventSubHttp,
			// 	TEST_CHANNEL_IDS,
			// );

			// setupSubscriptionListener();

			// eventSubHttp.start();

			// const predictionListener = createPredictionListener(
			// 	fastify.io,
			// 	TEST_CHANNEL_IDS,
			// );
			// fastify.io.use((socket, next) => {
			//   console.log(socket.handshake.headers.cookie);
			//   next();
			// });

			fastify.io.on("connection", (socket) => {
				let roomName: string;
				// const cleanup = predictionListener(socket);
				// const cleanup2 = subscriptionListener(socket);
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
					// socket.on("disconnect",);
					// cleanup();
					// cleanup2();
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
