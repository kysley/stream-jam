import { EventSubWsListener } from "@twurple/eventsub-ws";
import { Server, Socket } from "socket.io";
import { TEST_CHANNEL_IDS } from "..";
import { EventSubHttpListener } from "@twurple/eventsub-http";

export const createSubscriptionListener = (
	io: Server,
	eventSub: EventSubHttpListener,
	channelIds: number[],
) => {
	const subscriptions: Map<number, unknown> = new Map();

	const subscribeToChannelSubscriptionEvents = async (channelId: number) => {
		// eventSub.onChannelSub
		console.info(`${channelId}[SUBSCRIPTION]: Subscription listener setup`);

		const subscription2 = eventSub.onChannelSubscriptionMessage(
			channelId,
			console.log,
		);

		const subscription = eventSub.onChannelSubscription(
			channelId,
			async (event) => {
				console.info(
					`${event.broadcasterDisplayName}[SUBSCRIPTION]: ${event.userName} subscribed`,
				);
				// io.to(channelId.toString()).emit("subscription", event);
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

	return () => {
		for (const channelId of channelIds) {
			subscribeToChannelSubscriptionEvents(channelId);
		}
		return cleanup;
	};
	// return (socket: Socket) => {
	// 	const { channel = TEST_CHANNEL_IDS[0] } = socket.handshake.query;
	// 	if (typeof channel === "number" && channelIds.includes(channel)) {
	// 		console.info(
	// 			`${channel}[SUBSCRIPTION]: Subscription listener join attempt`,
	// 		);
	// 		// socket.join(channel);
	// 		subscribeToChannelSubscriptionEvents(channel);
	// 		return cleanup;
	// 	}
	// 	return async () => {};
	// };
};
