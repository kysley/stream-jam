import { Fragment, useCallback } from "react";
import { useListenForMagnetUpdate } from "../hooks/use-listen-for-magnet-update";
import { useRemoteMagnetStore } from "../state";
import { RemoteCanvasMagnet } from "./magnet/remote-canvas-magnet";
import { CanvasMagnet, MagnetRenderer } from "./magnet/canvas-magnet";

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
							<MagnetRenderer
								magnet={magnet}
								scaleX={magnet?.scale / 100}
								scaleY={magnet?.scale / 100}
								x={magnet?.x}
								y={magnet?.y}
								height={magnet?.height}
								width={magnet?.width}
							/>
						),
				)}
		</Fragment>
	);
}
