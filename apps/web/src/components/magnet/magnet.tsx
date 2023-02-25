import { Image } from "react-konva";
import { useMagnetActions, useManget, useSelectedMagnetId } from "../../state";
import useImage from "use-image";
import { useEmitMagnetUpdate } from "../../hooks/use-emit-magnet-update";
import { useThrottledCallback } from "@react-hookz/web";

type MagnetProps = {
  id: string;
};
export function Magnet({ id }: MagnetProps) {
  const magnet = useManget(id);
  const [image] = useImage(magnet?.url || "");
  const { setSelectedMagnetId } = useMagnetActions();
  const selectedId = useSelectedMagnetId();

  const { emitMagnetUpdate } = useEmitMagnetUpdate();
  const onMove = useThrottledCallback((fn) => fn(), [], 25);

  if (!magnet) {
    return null;
  }

  return (
    <Image
      image={image}
      draggable
      onDragMove={(event) => {
        const newX = event.target.attrs.x;
        const newY = event.target.attrs.y;

        onMove(() => {
          emitMagnetUpdate({ ...magnet, x: newX, y: newY });
        });
      }}
      onClick={(e) => {
        setSelectedMagnetId(magnet.id);
      }}
      scaleX={magnet?.scale}
      scaleY={magnet?.scale}
      stroke={selectedId === magnet.id ? "1px solid black" : undefined}
      x={magnet?.x}
      y={magnet?.y}
    />
  );
}
