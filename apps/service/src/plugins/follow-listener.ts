import { Server, Socket } from "socket.io";
import { AppTokenAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";
import { EventSubWsListener } from "@twurple/eventsub-ws";

export const createChannelFollowListener = (
	io: Server,
	channelIds: number[],
) => {
	const authProvider = new AppTokenAuthProvider(
		process.env.SJ_CLIENT_ID || "",
		process.env.SJ_SECRET || "",
	);

	const apiClient = new ApiClient({ authProvider });
	const eventSubApi = new EventSubWsListener({ apiClient });
	const subscriptions: Map<number, unknown> = new Map();

	const subscribeToChannelFollowEvents = async (channelId: number) => {
		const subscription = eventSubApi.onChannelFollow(
			channelId,
			"swan_one",
			async (event) => {
				console.info(
					`${event.broadcasterDisplayName}[FOLLOW]: ${event.userDisplayName} followed`,
				);
				io.to(channelId.toString()).emit(
					"channel-follow",
					event.broadcasterName,
				);
			},
		);
		subscriptions.set(channelId, subscription);
	};

	const cleanup = async () => {
		for (const [channel, subscription] of subscriptions) {
			await subscription.unsubscribe();
			subscriptions.delete(channel);
		}
	};

	return (socket: Socket) => {
		// const { channel = 39726444 } = socket.handshake.query;
		const channel = 121059319;
		if (typeof channel === "number" && channelIds.includes(channel)) {
			console.info(`${channel}[PREDICTION]: Prediction listener join attempt`);
			// socket.join(channel);
			subscribeToChannelFollowEvents(channel);
			return cleanup;
		} else {
			return async () => {};
		}
	};
};
