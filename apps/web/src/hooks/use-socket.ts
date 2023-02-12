import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Socket } from "socket.io-client/build/esm/socket";

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io("http://localhost:3000");
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return socket;
}
