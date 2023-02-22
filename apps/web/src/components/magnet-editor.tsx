import * as Slider from "@radix-ui/react-slider";
import { useEmitMagnetUpdate } from "../hooks/use-emit-magnet-update";
import { useMagnetActions, useSelectedMagnetId } from "../state";
import "./magnet-editor.styles.css";

export function MagnetEditor() {
  const id = useSelectedMagnetId();
  const { updateMagnet } = useMagnetActions();
  const { emitMagnetUpdate } = useEmitMagnetUpdate();
  if (!id) return null;

  return (
    <div className="editor-container">
      Scale
      <Slider.Root
        defaultValue={[1]}
        max={2}
        min={0}
        step={0.1}
        aria-label="Volume"
        className="slider-root"
        onValueChange={(value) => {
          const newState = updateMagnet(id, {
            style: { transform: `scale(${value[0]})` },
          });
          if (newState) emitMagnetUpdate(newState);
        }}
      >
        <Slider.Track className="slider-track">
          <Slider.Range className="slider-range" />
        </Slider.Track>
        <Slider.Thumb className="slider-thumb" />
      </Slider.Root>
    </div>
  );
}
