import type { Server } from "socket.io";
import type { AppRouter } from "./router";

declare module "fastify" {
	interface FastifyInstance {
		io: Server;
	}
}

export type { AppRouter };
