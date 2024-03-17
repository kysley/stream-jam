import { useMagnets } from "../../hooks/use-magnets";
import { useEditorActions, useMagnetActions } from "../../state";
import { Button } from "../ui/button";

export function PresetsPanel() {
	const { load } = useEditorActions();
	const { addMagnet } = useMagnetActions();
	const { data, isLoading } = useMagnets();
	return (
		<>
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
		</>
	);
}
