import { KonvaEventObject } from "konva/lib/Node";
import {
	forwardRef,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { Layer, Group, Stage } from "react-konva";
import { Html } from "react-konva-utils";
import { useMagnetActions, useStageActions, useStageState } from "../state";
import { MagnetDisplay } from "./magnet-display";
import { StreamPreview } from "./stream-preview";

export const StageComponent = forwardRef<HTMLDivElement, { room: string }>(
	(props, containerRef) => {
		const [stage, setStage] = useState<
			{ height: number; width: number } | undefined
		>();
		const { setCoords, setScale } = useStageActions();
		const { x, y, scale } = useStageState();
		const { setSelectedMagnetId } = useMagnetActions();

		useLayoutEffect(() => {
			function fitStageIntoParentContainer() {
				if (containerRef?.current) {
					// var container = document.querySelector("#stage-parent");

					// now we need to fit stage into parent container
					const width = containerRef.current.offsetWidth;
					const height = containerRef.current.offsetHeight;

					const scaleX = width / 1920;
					const scaleY = height / 1080;

					const scale = Math.min(scaleX, scaleY);

					console.log(containerRef.current);

					setStage({ width, height });
				}
			}
			fitStageIntoParentContainer();
		}, []);

		const handleWheel = useCallback(
			(e: KonvaEventObject<WheelEvent>) => {
				e.evt.preventDefault();

				const scaleBy = 1.02;
				const stage = e.target.getStage();
				if (!stage) return;
				const oldScale = stage.scaleX();
				const mousePointTo = {
					x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
					y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
				};

				const newScale =
					e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
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
			},
			[setScale, setCoords],
		);

		if (!stage) return null;

		return (
			<Stage
				height={stage.height}
				width={stage.width}
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
					{/* TODO: Not sure what to do about scaling the preview box to the stream resolution */}
					<Group
						x={1920 / 2}
						y={1080 / 3}
						// x={stage.width - 1920 * Ascale}
						// y={stage.height - 1080 * Ascale}
					>
						<Html
							divProps={{
								style: {
									// zIndex: allowIframeFocus ? undefined : -1,
									zIndex: -1,
									// transformOrigin: `${(stage.width - 1920 * Ascale) / 2}px ${
									// 	(stage.height - 1080 * Ascale) / 2
									// }px`,
								},
							}}
						>
							<StreamPreview />
						</Html>
					</Group>
					<MagnetDisplay />
				</Layer>
			</Stage>
		);
	},
);
