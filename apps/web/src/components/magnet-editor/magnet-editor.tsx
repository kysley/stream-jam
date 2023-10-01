import * as Slider from "@radix-ui/react-slider";
import { useClickOutside } from "@react-hookz/web";
import {
	IconCloudUpload,
	IconDeviceFloppy,
	IconEye,
	IconEyeOff,
	IconHandMove,
	IconLink,
	IconTrash,
	IconTrashX,
	IconUnlink,
} from "@tabler/icons-react";
import { Fragment, useRef, useState } from "react";
import { Magnet } from "../../state";
import { Button } from "../button";
import { Label } from "../label";
import { Layer } from "../layer";
import { Input, InputProps, TextArea } from "./../input";
import * as cls from "./magnet-editor.css";
import { produce } from "structurajs";
import { Card, CardContent, CardHeader } from "../ui/card";

export function InCardConfirmation({
	handleCancel,
	handleConfirm,
	mode,
	text,
}: {
	handleCancel(): void;
	handleConfirm(value?: unknown): void;
	mode: "text" | "action";
	text: string;
}) {
	const ref = useRef(null);
	useClickOutside(ref, handleCancel);

	const [name, setName] = useState("");

	return (
		<div ref={ref} className={cls.confirmation}>
			{mode === "action" ? (
				<Fragment>
					{text}
					<Button intent="danger" onClick={handleConfirm}>
						Confirm
					</Button>
				</Fragment>
			) : (
				<Fragment>
					<Input
						placeholder="Preset name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Button intent="primary" onClick={() => handleConfirm(name)}>
						{text}
					</Button>
				</Fragment>
			)}
		</div>
	);
}

export type MagnetEditorProps = {
	magnet?: Magnet;
	onMagnetChange(newState: Magnet): void;
	onMagnetSave(magnet: Magnet): void;
	onMagnetUpdate(magnet: Magnet): void;
	onMagnetRemove(id: Magnet["id"]): void;
};

export function MagnetEditor({
	magnet,
	onMagnetChange,
	onMagnetSave,
	onMagnetUpdate,
	onMagnetRemove,
}: MagnetEditorProps) {
	const [ratioLock, setRatioLock] = useState(true);
	const [confirm, setConfirm] = useState(false);
	const [save, setSave] = useState(false);

	if (!magnet) return null;

	const handleMagnetPropertyChange = <T extends keyof Magnet,>(
		key: T,
		value: Magnet[T],
	) => {
		const newMagnet = produce(magnet, (m) => {
			m[key] = value;
		});

		onMagnetChange(newMagnet);
	};

	const handleSave = (value?: string) => {
		const newMagnet = produce(magnet, (m) => {
			m.version = (m?.version || 0) + 1;
		});

		const payload = {
			name: value || newMagnet.id.toString(),
			props: {
				version: newMagnet.version,
				url: newMagnet.type === "media" ? newMagnet.url : undefined,
				text: newMagnet.type === "text" ? newMagnet.text : undefined,
				scale: newMagnet.scale,
				type: newMagnet.type,
				height: newMagnet.height,
				width: newMagnet.width,
				visible: newMagnet.visible,
			},
		};
		if (value) {
			onMagnetSave(payload);
		} else {
			onMagnetUpdate({ id: magnet.id, props: payload.props });
		}
		setSave(false);
	};

	return (
		<Card className={cls.editorContainer}>
			{confirm && (
				<InCardConfirmation
					text="Delete?"
					mode="action"
					handleCancel={() => setConfirm(false)}
					handleConfirm={() => {
						onMagnetRemove(magnet.id);
						setSave(false);
					}}
				/>
			)}
			{save && (
				<InCardConfirmation
					text="Save"
					mode="text"
					handleCancel={() => setSave(false)}
					handleConfirm={handleSave}
				/>
			)}
			<CardHeader>
				<div className="flex flex-row content-center">
					<Button
						onClick={() =>
							handleMagnetPropertyChange("visible", !magnet.visible)
						}
						ghost
						intent={magnet?.visible ? "primary" : "neutral"}
					>
						{magnet?.visible ? <IconEye /> : <IconEyeOff />}
					</Button>
					{magnet?.version ? (
						<Button ghost onClick={() => handleSave()}>
							<IconCloudUpload />
						</Button>
					) : (
						<Button onClick={() => setSave(true)} ghost intent={"neutral"}>
							<IconDeviceFloppy />
						</Button>
					)}
					<Button
						disabled
						onClick={() => setSave(true)}
						ghost
						intent={"neutral"}
					>
						<IconHandMove />
					</Button>
					{/* <Button ghost={<IconLockAccessOff />} /> */}
					<Button ghost intent="danger" onClick={() => setConfirm(true)}>
						{confirm ? <IconTrashX /> : <IconTrash />}
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<SliderWidget
					name="Scale"
					handleValueChange={(v) => {
						handleMagnetPropertyChange("scale", v[0]);
					}}
					value={magnet?.scale}
				/>

				<div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
					<InputWidget
						name="Height"
						value={magnet?.height || ""}
						onChange={(e) => {
							handleMagnetPropertyChange("height", +e.target.value);
						}}
					/>
					<div>
						{ratioLock ? (
							<Button
								ghost
								intent="primary"
								style={{ marginTop: "22px" }}
								onClick={() => setRatioLock((prev) => !prev)}
							>
								<IconLink size={24} />
							</Button>
						) : (
							<Button
								ghost
								style={{ marginTop: "22px" }}
								onClick={() => setRatioLock((prev) => !prev)}
							>
								<IconUnlink size={24} />
							</Button>
						)}
					</div>
					<InputWidget
						name="Width"
						value={magnet?.width || ""}
						onChange={(e) => {
							handleMagnetPropertyChange("width", +e.target.value);
						}}
					/>
				</div>
				{magnet.type === "media" && (
					<InputWidget
						value={magnet?.url || ""}
						name="URL"
						onChange={(e) => {
							if (magnet.type === "media") {
								handleMagnetPropertyChange("url", e.target.value);
							}
						}}
					/>
				)}
				{magnet.type === "text" && (
					<TextArea
						style={{ width: "100%", height: "200px" }}
						value={magnet?.text}
						name="Text"
						onChange={(e) => {
							if (magnet.type === "text") {
								handleMagnetPropertyChange("text", e.target.value);
							}
						}}
					/>
				)}
				{/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button intent="danger">Delete</Button>
        <div style={{ display: "flex", gap: 2 }}>
          <Button>Cancel</Button>
          <Button intent="primary">Save preset</Button>
        </div>
      </div> */}
			</CardContent>
		</Card>
	);
}

type WidgetProps = {
	name: string;
};

function SliderWidget(
	props: WidgetProps & { value?: number; handleValueChange(v: number[]): void },
) {
	return (
		<Label name={props.name}>
			<Slider.Root
				max={250}
				min={0}
				step={10}
				value={[props.value || 1]}
				name="Scale"
				className={cls.sliderRoot}
				onValueChange={props.handleValueChange}
			>
				<Slider.Track className={cls.sliderTrack}>
					<Slider.Range className={cls.sliderRange} />
				</Slider.Track>
				<Slider.Thumb className={cls.sliderThumb} />
			</Slider.Root>
		</Label>
	);
}

type InputWidgetProps = InputProps & WidgetProps;
function InputWidget(props: InputWidgetProps) {
	return <Input {...props} />;
}
