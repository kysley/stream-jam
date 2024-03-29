import { Group, Layer, Stage } from "react-konva";
import { useRoute } from "wouter";
import { RemoteMagnetDisplay } from "../../components/remote-magnet-display";
import { Html } from "react-konva-utils";

export function SourceIdPage() {
	const [match, params] = useRoute("/source/:id");

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
				<RemoteMagnetDisplay source room={params.id} />
			</Layer>
		</Stage>
	);
}
