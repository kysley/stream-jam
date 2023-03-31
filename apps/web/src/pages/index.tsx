import { MagnetEditor } from "../components/magnet-editor";
import { trpc } from "../utils/trpc";
import { StageComponent } from "../components/stage";

export function IndexPage() {
	const { data } = trpc.me.useQuery();

	return (
		<div>
			<div className="container">
				<MagnetEditor />
			</div>
			<StageComponent />
		</div>
	);
}
