import { useEffect } from "react";
import { useMagnetActions } from "../state";
import { useSocket } from "./use-socket";

export function useListenForMagnetUpdate(room: string) {
	const socket = useSocket();
	const { updateMagnet } = useMagnetActions();

	useEffect(() => {
		// race condition
		socket?.connect();
		socket?.emit("joinRoom", room);

		socket?.on("update", (data) => {
			// Ignore our own updates
			console.log(data);
			if (data.socketId === socket.id) return;
			updateMagnet(data.magnet.id, data.magnet);
		});

		return () => {
			socket?.emit("leaveRoom");
		};
	}, [room]);

	// useEffect(() => {
	// 	if (socket) {
	// 		socket.on("update", (data) => {
	// 			// Ignore our own updates
	// 			if (data.socketId === socket.id) return;
	// 			updateRemoteMagnet(data.magnet.id, data.magnet);
	// 		});
	// 	}
	// }, [socket]);
}
