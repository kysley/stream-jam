import { useRoute } from "wouter";
import { StageComponent } from "../../components/stage";
import { useEffect, useRef } from "react";
import { type WrappedMagnet, useRemoteMagnetActions } from "../../state";
import { EditorPanel, PresetsPanel } from "../../components/panels";
import { trpc } from "../../utils";

export function JamIdPage() {
	const [match, params] = useRoute("/jam/:id");
	const { loadRemoteMagnets } = useRemoteMagnetActions();
	const { data, isLoading: isOverlayLoading } = trpc.getOverlayByName.useQuery(
		{
			name: (match && params.id) || "",
		},
		{ enabled: match },
	);

	useEffect(() => {
		if (!isOverlayLoading && data) {
			loadRemoteMagnets(data?.magnets as WrappedMagnet[]);
		}
	}, [isOverlayLoading]);

	const containerRef = useRef<HTMLDivElement>(null);
	if (!match) return <span>404</span>;
	return (
		<div className="slotted-grid">
			<div className="pos-left">
				<PresetsPanel />
			</div>
			<div className="pos-main" ref={containerRef}>
				{isOverlayLoading ? (
					<span>loading...</span>
				) : (
					<StageComponent ref={containerRef} room={params.id} />
				)}
			</div>
			<div className="pos-right">
				<EditorPanel />
				{/* <StatefulMagnetEditor emit /> */}
			</div>
		</div>
	);
}
