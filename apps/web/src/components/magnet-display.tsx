import { Fragment } from "react";
import { useMagnetIds } from "../state";
import { CanvasMagnet } from "./magnet/canvas-magnet";

export function MagnetDisplay() {
	const localMagnetIds = useMagnetIds();

	if (!localMagnetIds) return null;

	return (
		<Fragment>
			{localMagnetIds.length > 0 &&
				localMagnetIds.map((id) => <CanvasMagnet key={id} id={id} />)}
		</Fragment>
	);
}
