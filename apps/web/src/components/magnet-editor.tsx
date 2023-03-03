import * as Slider from "@radix-ui/react-slider";
import { ReactNode } from "react";
import { useEmitMagnetUpdate } from "../hooks/use-emit-magnet-update";
import { useMagnetActions, useManget, useSelectedMagnetId } from "../state";
import "./magnet-editor.styles.css";

export function MagnetEditor() {
  const id = useSelectedMagnetId();
  const magnet = useManget(id);
  const { updateMagnet } = useMagnetActions();
  const { emitMagnetUpdate } = useEmitMagnetUpdate();
  if (!(id || magnet)) return null;

  return (
    <div className="editor-container">
      <EditorWidget label="Scale">
        <Slider.Root
          max={2}
          min={0}
          step={0.1}
          value={[magnet?.scale || 0.6]}
          name="Scale"
          className="slider-root"
          onValueChange={(value) => {
            const newState = updateMagnet(id, {
              scale: value[0],
            });
            if (newState) emitMagnetUpdate(newState);
          }}
        >
          <Slider.Track className="slider-track">
            <Slider.Range className="slider-range" />
          </Slider.Track>
          <Slider.Thumb className="slider-thumb" />
        </Slider.Root>
      </EditorWidget>
      <InputWidget name="Height" type="number" />
      <InputWidget name="Width" type="number" />
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

function EditorWidget({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label}
      {children}
    </label>
  );
}

type InputWidgetProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
};
function InputWidget({ name, ...rest }: InputWidgetProps) {
  return (
    <EditorWidget label={name}>
      <input {...rest} />
    </EditorWidget>
  );
}
