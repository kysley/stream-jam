import { useEffect } from "react";
import { Layer, Stage } from "react-konva";
import { Input } from "../components/input";
import { MagnetEditor } from "../components/magnet-editor";
import { Magnet } from "../components/magnet/magnet";
import { RemoteMagnet } from "../components/magnet/remote-magnet";
import * as cls from "../components/start/start-page.css";
import { useMagnetActions, useStageActions } from "../state";

export function StartPage() {
	const { addMagnet, setSelectedMagnetId } = useMagnetActions();
	useEffect(() => {
		addMagnet({
			id: "1",
			scale: 1,
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
						<Magnet id='1' />
					</Layer>
				</Stage>
				<MagnetEditor />
				{/* <h2>[Magnet Editor]</h2>
				<Input />
				<Input />
				<Input />
				<Input /> */}
			</section>
		</div>
	);
}
