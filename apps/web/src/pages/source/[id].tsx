import { Group, Layer, Stage } from "react-konva";
import { useRoute } from "wouter";
import { Html } from "react-konva-utils";
import { MagnetDisplay } from "../../components/magnet-display";
import { useListenForMagnetUpdate } from "../../hooks/use-listen-for-magnet-update";

export function SourceIdPage() {
	const [match, params] = useRoute("/source/:id");
	useListenForMagnetUpdate(params.id);

	if (!match) return <span>404</span>;

	return (
		<Stage x={-(1920 / 2)} y={-(1080 / 3)} width={1920} height={1080}>
			<Layer>
				{import.meta.env.DEV && (
					<Group x={1000} y={500}>
						<Html>
							<h3>
								IN DEV MODE. PREVIEW WILL BE CUT OFF BECAUSE NOT FULLSCREEN
							</h3>
						</Html>
					</Group>
				)}
				<MagnetDisplay />
			</Layer>
		</Stage>
	);
}
