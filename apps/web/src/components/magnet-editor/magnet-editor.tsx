import * as Slider from "@radix-ui/react-slider";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import { ChangeEvent, ReactNode, useState } from "react";
import { useEmitMagnetUpdate } from "../../hooks/use-emit-magnet-update";
import { useMagnetActions, useManget, useSelectedMagnetId } from "../../state";
import { Label } from "../label";
import { Switch } from "../switch/switch";
import { Input, InputProps } from "./../input";
import * as cls from "./magnet-editor.css";

export function MagnetEditor() {
  const id = useSelectedMagnetId();
  const magnet = useManget(id);
  const { updateMagnet } = useMagnetActions();
  const { emitMagnetUpdate } = useEmitMagnetUpdate();

  const [ratioLock, setRatioLock] = useState(true);

  const handleScaleSliderChange = (value: number[]) => {
    const newState = updateMagnet(id, {
      scale: value[0],
    });
    if (newState) emitMagnetUpdate(newState);
  };

  const handleVisibilityChange = (checked: boolean) => {
    const newState = updateMagnet(id, {
      visible: checked,
    });
    if (newState) emitMagnetUpdate(newState);
  };

  if (!(id || magnet)) return null;

  return (
    <div className={cls.editorContainer}>
      <Switch
        name="Visible"
        // onChange={handleVisibilityChange}
        onCheckedChange={handleVisibilityChange}
        checked={magnet?.visible}
      />
      <SliderWidget
        name="Scale"
        handleValueChange={handleScaleSliderChange}
        value={magnet?.scale}
      />
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <InputWidget name="Height" type="number" />
        <button
          onClick={() => setRatioLock((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          {ratioLock ? (
            <IconLock size={24} style={{ marginTop: "22px" }} />
          ) : (
            <IconLockOpen size={24} style={{ marginTop: "22px" }} />
          )}
        </button>
        <InputWidget name="Width" type="number" />
      </div>
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
    </div>
  );
}

type WidgetProps = {
  name: string;
};

function SliderWidget(
  props: WidgetProps & { value?: number; handleValueChange(v: number[]): void }
) {
  return (
    <Label name={props.name}>
      <Slider.Root
        max={2}
        min={0}
        step={0.1}
        value={[props.value || 0.6]}
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
