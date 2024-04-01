import { type CSSProperties, useEffect, useState } from "react";
import {
	type Magnet,
	useEditor,
	useMagnetActions,
	useManget,
	useSelectedMagnetId,
} from "../../../state";
import { MagnetEditor } from "../../magnet-editor";
import { MagnetRenderer } from "../../magnet/canvas-magnet";
import { Button } from "../../ui/button";
import { IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";
import { he } from "date-fns/locale";
import { makeMagnetProps, trpc } from "../../../utils";
import { useSaveMagnet } from "../../../hooks/use-save-magnet";
import { useRoute } from "wouter";

// TODO: Editing existing magnet vs adding it to the scene
export function EditorPanel() {
	const [match, params] = useRoute("/jam/:id");
	const [popout, setPopout] = useState(false);
	const selectedMagnetId = useSelectedMagnetId();
	const existingmagnet = useManget(selectedMagnetId);
	const { actions, magnet: tempMagnet } = useEditor();
	const { addMagnet, updateMagnet, setSelectedMagnetId } = useMagnetActions();

	const { mutateAsync: createMagnet } = useSaveMagnet();

	const isTempMagnet = !selectedMagnetId && tempMagnet;

	const magnet = existingmagnet ?? tempMagnet;

	const imageStyles: CSSProperties = {
		// maxWidth: "100%",
		// maxHeight: "100%",
		objectFit: "contain",
		transform: `scale(${magnet?.scale / 100})`,
		transformOrigin: "center",
	};

	useEffect(() => {
		if (!selectedMagnetId) {
			actions.clear();
		}
	}, [selectedMagnetId, actions.clear]);

	function handleUpdate(values: Partial<Magnet>) {
		if (isTempMagnet || !selectedMagnetId) {
			actions.update(values);
		} else {
			updateMagnet(selectedMagnetId, values);
		}
	}

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
					EDITOR
				</span>
			</div>
			{magnet ? (
				<div
					style={{
						display: "grid",
						position: "relative",
					}}
				>
					{popout ? (
						<PreviewPopout
							magnet={magnet}
							onPreviewClose={() => setPopout(false)}
						/>
					) : (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								// overflow: popout ? undefined : "hidden",
								overflow: "hidden",
								position: "relative",
								minHeight: "15vh",
							}}
						>
							<Button
								size="sm"
								variant="ghost"
								style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
								// style={{ justifySelf: "flex-end" }}
								onClick={() => setPopout(true)}
							>
								<IconArrowsMaximize size={18} />
							</Button>
							{magnet.type === "media" && (
								<img src={magnet.url} style={imageStyles} />
							)}
						</div>
					)}
					<div className="p-2 space-y-2">
						<MagnetEditor magnet={magnet} onMagnetChange={handleUpdate} />
						<div className="flex flex-row justify-between">
							<Button
								variant="secondary"
								onClick={async () => {
									addMagnet(magnet);
									actions.clear();
									setSelectedMagnetId(magnet.id);
									if (match) {
										await createMagnet({
											name: "testing",
											overlayId: params.id,
											props: makeMagnetProps(magnet, {
												preservePosition: true,
											}),
										});
									}
								}}
							>
								Add to scene
							</Button>
							{!selectedMagnetId && (
								<Button
									variant="outline"
									onClick={() => {
										actions.clear();
										setSelectedMagnetId(undefined);
									}}
								>
									Discard
								</Button>
							)}
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col justify-center items-center h-full">
					Select a magnet to edit or
					<Button
						onClick={() =>
							actions.load({
								id: crypto.randomUUID().toString(),
								url: "",
								visible: true,
								x: 50,
								y: 100,
								scale: 100,
								type: "media",
							})
						}
					>
						Create a magnet
					</Button>
				</div>
			)}
		</>
	);
}

type PreviewPopoutProps = {
	magnet: Magnet;
	onPreviewClose(): void;
};

function PreviewPopout({ magnet, onPreviewClose }: PreviewPopoutProps) {
	return (
		<div
			style={{
				position: "absolute",
				top: "0",
				left: "-35vw",
				backgroundColor: "rgb(22,22,22)",
				border: "1px solid rgb(55,55,55)",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					backgroundColor: "rgb(44,44,44)",
					// justifyContent: "center",
					alignItems: "center",
					boxShadow:
						"inset -1px -1px rgb(33,33,33),inset 1px 1px rgb(22,22,22),inset -2px -2px rgb(22,22,22),inset 2px 2px rgb(55,55,55)",
				}}
			>
				<span
					style={{
						textAlign: "center",
						// justifySelf: "center",
						fontStyle: "italic",
					}}
				>
					PREVIEW
				</span>
				<Button
					size="sm"
					variant="ghost"
					// style={{ position: "absolute", right: 5, }}
					// style={{ justifySelf: "flex-end" }}
					onClick={() => onPreviewClose()}
				>
					<IconArrowsMinimize size={18} />
				</Button>
			</div>
			<div
				style={{
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					height: "100%",
					overflow: "hidden",
				}}
			>
				{magnet.type === "media" && (
					<img
						src={magnet.url}
						style={{
							objectFit: "contain",
							transform: `scale(${magnet?.scale / 100})`,
							transformOrigin: "center",
							justifySelf: "center",
							alignSelf: "center",
						}}
					/>
				)}
			</div>
		</div>
	);
}
