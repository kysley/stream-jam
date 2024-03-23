import { useEffect, useState } from "react";
import io from "socket.io-client";
import type { Socket } from "socket.io-client";

const socketIo = io("http://localhost:3000", {
	withCredentials: true,
	autoConnect: false,
});

export function useSocket() {
	const [socket, setSocket] = useState<Socket | null>(socketIo);

	// todo: lazy singleton fix. make this a context or store
	// useEffect(() => {
	//   const socketIo = io("http://localhost:3000");
	//   setSocket(socketIo);

	//   return () => {
	//     socketIo.disconnect();
	//   };
	// }, []);

	return socket;
}
