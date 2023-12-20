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
import { EditorPanel } from "../../components/panels/editor/editor-panel";

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
				<div
					style={{
						display: "flex",
						backgroundColor: "rgb(44,44,44)",
						borderTopLeftRadius: "inherit",
						justifyContent: "center",
						alignItems: "center",
						boxShadow:
							"inset -1px -1px rgb(33,33,33),inset 1px 1px rgb(22,22,22),inset -2px -2px rgb(22,22,22),inset 2px 2px rgb(55,55,55)",
					}}
				>
					<span
						style={{
							textAlign: "center",
							fontStyle: "italic",
						}}
					>
						ASSETS
					</span>
				</div>
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
									onClick={
										() => {
											console.log(props);
											load({
												id: `${id}${Date.now()}`,
												name,
												...props,
											});
										}
										// addMagnet({
										// 	id: `${id}${Date.now()}`,
										// 	name,
										// 	...props,
										// })
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
				<EditorPanel />
				{/* <StatefulMagnetEditor emit /> */}
			</div>
		</div>
	);
}
