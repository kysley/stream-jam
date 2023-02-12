import { useSelectedMagnet } from "../hooks/use-selected-magnet";
import * as Slider from "@radix-ui/react-slider";

export function MagnetEditor() {
  const m = useSelectedMagnet();
  if (!m) return null;

  return (
    <div>
      Scale
      <Slider.Root defaultValue={[50]} max={100} step={1} aria-label="Volume">
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb />
      </Slider.Root>
    </div>
  );
}
