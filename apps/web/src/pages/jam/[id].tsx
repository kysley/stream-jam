import { useRoute } from "wouter";
import { StageComponent } from "../../components/stage";
import { useEffect, useRef } from "react";
import { type WrappedMagnet, useMagnetActions } from "../../state";
import { EditorPanel, PresetsPanel } from "../../components/panels";
import { trpc } from "../../utils";
import { useListenForMagnetUpdate } from "../../hooks/use-listen-for-magnet-update";

export function JamIdPage() {
	const [match, params] = useRoute("/jam/:id");
	const { loadMagnets } = useMagnetActions();
	const { data, isLoading: isOverlayLoading } = trpc.getOverlayByName.useQuery(
		{
			name: (match && params.id) || "",
		},
		{ enabled: match },
	);

	useListenForMagnetUpdate(params?.id);

	useEffect(() => {
		if (!isOverlayLoading && data) {
			loadMagnets(data?.magnets as WrappedMagnet[]);
		}
	}, [isOverlayLoading]);

	const containerRef = useRef<HTMLDivElement>(null);
	if (!match) return <span>404</span>;
	return (
		<div className="slotted-grid">
			{/* <div className="pos-left"> */}
			{/* <PresetsPanel /> */}
			{/* </div> */}
			<div className="pos-main" ref={containerRef}>
				{isOverlayLoading ? (
					<span>loading...</span>
				) : (
					<StageComponent ref={containerRef} room={params.id} />
				)}
			</div>
			{/* <div className="pos-right"> */}
			{/* <EditorPanel /> */}
			{/* <StatefulMagnetEditor emit /> */}
			{/* </div> */}
		</div>
	);
}
