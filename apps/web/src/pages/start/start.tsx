import { useEffect } from "react";
import { Layer, Stage } from "react-konva";
import { StatefulMagnetEditor } from "../../components/magnet-editor";
import { CanvasMagnet } from "../../components/magnet/canvas-magnet";
import * as cls from "./start-page.css";
import { useMagnetActions } from "../../state";

export function StartPage() {
	const { addMagnet, setSelectedMagnetId } = useMagnetActions();
	useEffect(() => {
		addMagnet({
			id: "1",
			scale: 100,
			type: "media",
			url: "https://i.imgur.com/frFzz7e.gif",
			visible: true,
			x: 0,
			y: 0,
		});
		setSelectedMagnetId("1");
	}, []);
	return (
		<div className={cls.container}>
			<section>
				<h2>Connect to a board</h2>
			</section>
			<section>
				<Stage height={window.innerHeight} width={window.innerWidth / 2}>
					<Layer>
						<CanvasMagnet id='1' />
					</Layer>
				</Stage>
				<StatefulMagnetEditor />
				{/* <h2>[Magnet Editor]</h2>
				<Input />
				<Input />
				<Input />
				<Input /> */}
			</section>
		</div>
	);
}
