import { CSSProperties, useState } from "react";
import {
	Magnet,
	useEditor,
	useMagnetActions,
	useManget,
	useSelectedMagnetId,
} from "../../../state";
import { MagnetEditor } from "../../magnet-editor";
import { MagnetRenderer } from "../../magnet/canvas-magnet";
import { Button } from "../../ui/button";
import { IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";

// TODO: Editing existing magnet vs adding it to the scene
export function EditorPanel() {
	const [popout, setPopout] = useState(true);
	useMagnetActions();
	const magnetId = useSelectedMagnetId();
	const existingmagnet = useManget(magnetId);
	const { actions, magnet } = useEditor();

	const imageStyles: CSSProperties = {
		// maxWidth: "100%",
		// maxHeight: "100%",
		objectFit: "contain",
		transform: `scale(${magnet?.scale / 100})`,
		transformOrigin: "center",
	};

	if (!magnet) {
		return (
			<div className="flex flex-col justify-center items-center h-full">
				Select a magnet to edit or
				<Button>Create a magnet</Button>
			</div>
		);
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
				<div className="p-2">
					<MagnetEditor magnet={magnet} />
				</div>
			</div>
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
				left: "-25vw",
				width: "20vw",
				height: "20vh",
				backgroundColor: "rgb(22,22,22)",
				borderRadius: 10,
				border: "1px solid rgb(33,33,33)",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					backgroundColor: "rgb(33,33,33)",
					// justifyContent: "center",
					alignItems: "center",
					borderTopLeftRadius: "inherit",
					borderTopRightRadius: "inherit",
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
