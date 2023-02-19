import * as Slider from "@radix-ui/react-slider";
import "./magnet-editor.styles.css";

export function MagnetEditor() {
  const m = undefined;
  if (!m) return null;

  return (
    <div>
      Scale
      <Slider.Root
        defaultValue={[1]}
        max={2}
        min={0}
        step={0.1}
        aria-label="Volume"
        className="slider-root"
        onValueChange={(value) => {
          console.log(value[0]);
          m.setMagnet((prev) => ({
            ...prev,
            style: { ...prev.style, transform: `scale(${value[0]})` },
          }));
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
