import { useRoute } from "wouter";
import { StageComponent } from "../../components/stage";
import { useRef } from "react";
import { useMagnets } from "../../hooks/use-magnets";
import { Button } from "../../components/ui/button";
import { useEditorActions, useMagnetActions } from "../../state";
import {
	MagnetEditor,
	StatefulMagnetEditor,
} from "../../components/magnet-editor";
import { EditorPanel, PresetsPanel } from "../../components/panels";

export function JamIdPage() {
	const { load } = useEditorActions();

	const [match, params] = useRoute("/jam/:id");
	const { addMagnet } = useMagnetActions();
	const { data, isLoading } = useMagnets();
	const containerRef = useRef<HTMLDivElement>(null);
	if (!match) return <span>404</span>;
	return (
		<div className="slotted-grid">
			<div className="pos-left">
				<PresetsPanel />
			</div>
			<div className="pos-main" ref={containerRef}>
				<StageComponent ref={containerRef} room={params.id} />
			</div>
			<div className="pos-right">
				<EditorPanel />
				{/* <StatefulMagnetEditor emit /> */}
			</div>
		</div>
	);
}
