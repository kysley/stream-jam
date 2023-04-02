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
import { useEmitMagnetUpdate } from "../../hooks/use-emit-magnet-update";
import { useSaveMagnet } from "../../hooks/use-save-magnet";
import { useUpdateMagnet } from "../../hooks/use-update-magnet";
import { useMagnetActions, useManget, useSelectedMagnetId } from "../../state";
import { Button } from "../button";
import { Label } from "../label";
import { Layer } from "../layer";
import { Input, InputProps, TextArea } from "./../input";
import * as cls from "./magnet-editor.css";

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

export function MagnetEditor() {
	const id = useSelectedMagnetId();
	const magnet = useManget(id);
	const { updateMagnet: updateMagnetStore, removeMagnet } = useMagnetActions();
	const { emitMagnetUpdate } = useEmitMagnetUpdate();
	const { mutateAsync: saveMagnet } = useSaveMagnet();
	const { mutateAsync: updateMagnet } = useUpdateMagnet();

	const [ratioLock, setRatioLock] = useState(true);
	const [confirm, setConfirm] = useState(false);
	const [save, setSave] = useState(false);

	const handleScaleSliderChange = (value: number[]) => {
		const newState = updateMagnetStore(id, {
			scale: value[0],
		});
		if (newState) emitMagnetUpdate(newState);
	};

	const handleVisibilityChange = () => {
		const newState = updateMagnetStore(id, {
			visible: !magnet?.visible,
		});
		if (newState) emitMagnetUpdate(newState);
	};

	const handleSave = (value?: string) => {
		if (magnet?.type === "media") {
			const props = { ...magnet };
			const nextVer = magnet?.version || 0 + 1;
			const payload = {
				name: magnet?.id.toString(),
				props: {
					version: nextVer,
					url: props.url,
					scale: props.scale,
					type: props.type,
					height: props.height,
					width: props.width,
				},
			};
			if (value) {
				saveMagnet(payload);
			} else {
				updateMagnet({ id: magnet.id, props: payload.props });
			}
		}
		setSave(false);
	};

	if (!id || !magnet) return null;

	console.log(magnet);

	return (
		<Layer className={cls.editorContainer}>
			{confirm && (
				<InCardConfirmation
					text="Delete?"
					mode="action"
					handleCancel={() => setConfirm(false)}
					handleConfirm={() => {
						removeMagnet(magnet?.id);
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
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<div style={{ display: "flex" }}>
					<Button
						onClick={handleVisibilityChange}
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
				</div>
				{/* <Button ghost={<IconLockAccessOff />} /> */}
				<Button ghost intent="danger" onClick={() => setConfirm(true)}>
					{confirm ? <IconTrashX /> : <IconTrash />}
				</Button>
			</div>
			<SliderWidget
				name="Scale"
				handleValueChange={handleScaleSliderChange}
				value={magnet?.scale}
			/>

			<div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
				<InputWidget
					name="Height"
					value={magnet?.height || ""}
					onChange={(e) => {
						const newState = updateMagnetStore(id, {
							height: +e.target.value || undefined,
							width: ratioLock ? +e.target.value : magnet.width,
						});
						if (newState) emitMagnetUpdate(newState);
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
						const newState = updateMagnetStore(id, {
							width: +e.target.value || undefined,
							height: ratioLock ? +e.target.value : magnet.height,
						});
						if (newState) emitMagnetUpdate(newState);
					}}
				/>
			</div>
			{magnet?.type === "media" && (
				<InputWidget
					value={magnet?.url || ""}
					name="URL"
					onChange={(e) => {
						const newState = updateMagnetStore(id, {
							url: e.target.value,
						});
						if (newState) emitMagnetUpdate(newState);
					}}
				/>
			)}
			{magnet?.type === "text" && (
				<TextArea
					style={{ width: "100%", height: "200px" }}
					value={magnet?.text}
					name="Text"
					onChange={(e) => {
						const newState = updateMagnetStore(id, {
							text: e.target.value,
						});
						if (newState) emitMagnetUpdate(newState);
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
		</Layer>
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
