import { Fragment, useCallback } from "react";
import { useListenForMagnetUpdate } from "../hooks/use-listen-for-magnet-update";
import { useRemoteMagnetStore } from "../state";
import { RemoteCanvasMagnet } from "./magnet/remote-canvas-magnet";

export function RemoteMagnetDisplay({ source = false }: { source: boolean }) {
	const remoteMagnets = useRemoteMagnetStore(
		useCallback((state) => state.magnets, []),
	);
	useListenForMagnetUpdate();

	if (!remoteMagnets.length) return null;

	return (
		<Fragment>
			{remoteMagnets.length > 0 &&
				remoteMagnets.map(
					(magnet) =>
						magnet.visible && (
							<RemoteMagnet key={magnet.id} magnet={magnet} source={source} />
						),
				)}
		</Fragment>
	);
}
