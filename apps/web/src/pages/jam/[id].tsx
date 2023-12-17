import { useRoute } from "wouter";
import { StageComponent } from "../../components/stage";
import { useRef } from "react";
import { useMagnets } from "../../hooks/use-magnets";
import { Button } from "../../components/ui/button";
import { useMagnetActions } from "../../state";
import {
	MagnetEditor,
	StatefulMagnetEditor,
} from "../../components/magnet-editor";

export function JamIdPage() {
	const [match, params] = useRoute("/jam/:id");
	const { addMagnet } = useMagnetActions();
	const { data, isLoading } = useMagnets();
	const containerRef = useRef<HTMLDivElement>(null);
	if (!match) return <span>404</span>;
	return (
		<div className="slotted-grid">
			<div className="pos-left">
				<div
					style={{
						display: "grid",
						gridAutoFlow: "dense",
						gap: "1em",
						gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
					}}
				>
					{data?.map(
						({ id, name, props }) =>
							props?.type === "media" && (
								<Button
									key={id}
									variant="ghost"
									style={{ height: "auto" }}
									onClick={() =>
										addMagnet({
											id: `${id}${Date.now()}`,
											name,
											...props,
										})
									}
								>
									<img
										style={{ cursor: "pointer", maxWidth: 150 }}
										src={props.url || ""}
										alt={name}
									/>
								</Button>
							),
					)}
				</div>
			</div>
			<div className="pos-main" ref={containerRef}>
				<StageComponent ref={containerRef} />
			</div>
			<div className="pos-right">
				<StatefulMagnetEditor emit />
			</div>
		</div>
	);
}
