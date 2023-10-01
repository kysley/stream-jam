import { useEffect } from "react";
import { useRemoteMagnetActions } from "../state";
import { useSocket } from "./use-socket";

export function useListenForMagnetUpdate() {
	const socket = useSocket();
	const { updateRemoteMagnet } = useRemoteMagnetActions();

	useEffect(() => {
		socket?.emit("joinRoom", "test");

		return () => {
			socket?.emit("leaveRoom");
		};
	}, []);

	useEffect(() => {
		if (socket) {
			socket.on("update", (data) => {
				// Ignore our own updates
				if (data.socketId === socket.id) return;
				updateRemoteMagnet(data.magnet.id, data.magnet);
			});
		}
	}, [socket]);
}
