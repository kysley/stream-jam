import * as Slider from "@radix-ui/react-slider";
import { useClickOutside } from "@react-hookz/web";
import {
	IconDeviceFloppy,
	IconDragDrop,
	IconDragDrop2,
	IconEye,
	IconEyeOff,
	IconHandMove,
	IconLink,
	IconTrash,
	IconTrashX,
	IconUnlink,
	IconUpload,
} from "@tabler/icons-react";
import { Fragment, useRef, useState } from "react";
import { useEmitMagnetUpdate } from "../../hooks/use-emit-magnet-update";
import {
	useMagnetActions,
	useManget,
	useSelectedMagnetId,
	useStageState,
} from "../../state";
import { Button } from "../button";
import { Label } from "../label";
import { Input, InputProps, TextArea } from "./../input";
import * as cls from "./magnet-editor.css";

export function InCardConfirmation({
	handleCancel,
	handleConfirm,
	mode,
	text,
}: {
	handleCancel(): void;
	handleConfirm(): void;
	mode: "text" | "action";
	text: string;
}) {
	const ref = useRef(null);
	useClickOutside(ref, handleCancel);
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
					<Input placeholder="Preset name" />
					<Button intent="primary" onClick={handleConfirm}>
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
	const { updateMagnet } = useMagnetActions();
	const { emitMagnetUpdate } = useEmitMagnetUpdate();
	const { scale } = useStageState();

	const [ratioLock, setRatioLock] = useState(true);
	const [confirm, setConfirm] = useState(false);
	const [save, setSave] = useState(false);

	const handleScaleSliderChange = (value: number[]) => {
		const newState = updateMagnet(id, {
			scale: value[0],
		});
		if (newState) emitMagnetUpdate(newState);
	};

	const handleVisibilityChange = () => {
		const newState = updateMagnet(id, {
			visible: !magnet?.visible,
		});
		if (newState) emitMagnetUpdate(newState);
	};

	if (!(id || magnet)) return null;

	return (
		<div className={cls.editorContainer}>
			{confirm && (
				<InCardConfirmation
					text="Delete?"
					mode="action"
					handleCancel={() => setConfirm(false)}
					handleConfirm={() => setConfirm(false)}
				/>
			)}
			{save && (
				<InCardConfirmation
					text="Save"
					mode="text"
					handleCancel={() => setSave(false)}
					handleConfirm={() => setSave(false)}
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
					<Button onClick={() => setSave(true)} ghost intent={"neutral"}>
						<IconDeviceFloppy />
					</Button>
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
						const newState = updateMagnet(id, {
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
						const newState = updateMagnet(id, {
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
						const newState = updateMagnet(id, {
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
						const newState = updateMagnet(id, {
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
		</div>
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
				max={5}
				min={0.25}
				step={0.1}
				value={[props.value || 0.5]}
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
