import { Fragment, useCallback } from "react";
import { useListenForMagnetUpdate } from "../hooks/use-listen-for-magnet-update";
import { useRemoteMagnetStore } from "../state";
import { RemoteMagnet } from "./magnet/remote-magnet";

export function RemoteMagnetDisplay() {
  const remoteMagnets = useRemoteMagnetStore(
    useCallback((state) => state.magnets, [])
  );
  useListenForMagnetUpdate();

  if (!remoteMagnets.length) return null;

  return (
    <Fragment>
      {remoteMagnets.length > 0 &&
        remoteMagnets.map((magnet) => (
          <RemoteMagnet key={magnet.id} magnet={magnet} />
        ))}
    </Fragment>
  );
}
