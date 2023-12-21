import { Server, Socket } from "socket.io";
import { AppTokenAuthProvider } from "@twurple/auth";
import { ApiClient, HelixEventSubSubscription } from "@twurple/api";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { TEST_CHANNEL_IDS } from "..";

type CleanupFunction = () => Promise<void>;

export const createPredictionListener = (io: Server, channelIds: number[]) => {
	const authProvider = new AppTokenAuthProvider(
		process.env.SJ_CLIENT_ID || "",
		process.env.SJ_SECRET || "",
	);

	const apiClient = new ApiClient({ authProvider });
	const eventSubApi = new EventSubWsListener({ apiClient });
	const subscriptions: Map<number, unknown> = new Map();

	const subscribeToChannelPredictionBeginEvents = async (channelId: number) => {
		const subscription = eventSubApi.onChannelPredictionBegin(
			channelId,
			async (event) => {
				console.info(
					`${event.broadcasterDisplayName}[PREDICTION]: Prediction ${event.title} started`,
				);
				io.to(channelId.toString()).emit(
					"prediction-begin",
					event.broadcasterName,
				);
			},
		);
		subscriptions.set(channelId, subscription);
	};

	const subscribeToChannelPredictionProgressEvents = async (
		channelId: number,
	) => {
		const subscription = eventSubApi.onChannelPredictionProgress(
			channelId,
			async (event) => {
				// const prediction =
				// 	await apiClient.helix.predictions.getPredictionById(
				// 		event.predictionId,
				// 	);
				console.info(
					`${event.broadcasterDisplayName}[PREDICTION]: Prediction ${event.title} progress`,
				);
				io.to(channelId.toString()).emit("prediction-progress", event.outcomes);
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
		const { channel = TEST_CHANNEL_IDS[0] } = socket.handshake.query;
		if (typeof channel === "number" && channelIds.includes(channel)) {
			console.info(`${channel}[PREDICTION]: Prediction listener join attempt`);
			// socket.join(channel);
			subscribeToChannelPredictionBeginEvents(channel);
			subscribeToChannelPredictionProgressEvents(channel);
			return cleanup;
		}
		return async () => {};
	};
};
