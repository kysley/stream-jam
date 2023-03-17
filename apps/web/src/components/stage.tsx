import { KonvaEventObject } from "konva/lib/Node";
import { useCallback } from "react";
import { Layer, Group, Stage } from "react-konva";
import { Html } from "react-konva-utils";
import { useMagnetActions, useStageActions, useStageState } from "../state";
import { MagnetDisplay } from "./magnet-display";
import { RemoteMagnetDisplay } from "./remote-magnet-display";
import { StreamPreview } from "./stream-preview";

export function StageComponent() {
	const { setCoords, setScale } = useStageActions();
	const { x, y, scale } = useStageState();
	const { setSelectedMagnetId } = useMagnetActions();

	const handleWheel = useCallback((e: KonvaEventObject<WheelEvent>) => {
		e.evt.preventDefault();

		const scaleBy = 1.02;
		const stage = e.target.getStage();
		if (!stage) return;
		const oldScale = stage.scaleX();
		const mousePointTo = {
			x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
			y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
		};

		const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
		const newX =
			(stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale;
		const newY =
			(stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale;

		setScale(newScale);
		setCoords(newX, newY);
		// setStage({
		//   scale: newScale,
		//   x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
		//   y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale,
		// });
	}, []);
	return (
		<Stage
			// style={{ backgroundColor: "gray" }}
			width={window.innerWidth}
			height={window.innerHeight}
			onWheel={handleWheel}
			scaleX={scale}
			scaleY={scale}
			x={x}
			y={y}
			draggable
			onMouseDown={(e) => {
				// deselect when clicked on empty area
				const clickedOnEmpty = e.target === e.target.getStage();
				if (clickedOnEmpty) {
					setSelectedMagnetId(undefined);
				}
			}}
		>
			<Layer>
				<Group x={1920 / 2} y={1080 / 3}>
					<Html
						divProps={{
							style: {
								// zIndex: allowIframeFocus ? undefined : -1,
								zIndex: -1,
							},
						}}
					>
						<StreamPreview />
					</Html>
				</Group>
				<MagnetDisplay />
				<RemoteMagnetDisplay source={false} />
			</Layer>
		</Stage>
	);
}
