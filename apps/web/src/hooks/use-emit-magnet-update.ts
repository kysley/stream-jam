import { useCallback } from "react";
import { Magnet } from "../state";
import { useSocket } from "./use-socket";

export function useEmitMagnetUpdate() {
  const socket = useSocket();

  const emitMagnetUpdate = useCallback(
    (newState: Partial<Magnet>) => {
      socket?.emit("update", { socketId: socket.id, magnet: newState });
    },
    [socket]
  );

  return { emitMagnetUpdate };
}
