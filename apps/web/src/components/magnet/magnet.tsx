import { Image } from "react-konva";
import { useState, useRef } from "react";
import { useMagnetActions, useManget, useSelectedMagnetId } from "../../state";
import useImage from "use-image";
import { useEmitMagnetUpdate } from "../../hooks/use-emit-magnet-update";
import { useThrottledCallback } from "@react-hookz/web";

type MagnetProps = {
  id: string;
  disabled?: boolean;
};
export function Magnet({ id, disabled }: MagnetProps) {
  const magnet = useManget(id);
  const [image] = useImage(magnet?.url || "");
  const { setSelectedMagnetId } = useMagnetActions();
  const selectedId = useSelectedMagnetId();

  const { emitMagnetUpdate } = useEmitMagnetUpdate();
  const { updateMagnet } = useMagnetActions();
  const onMove = useThrottledCallback((fn) => fn(), [], 25);

  if (!magnet) {
    return null;
  }

  return (
    <Image
      image={image}
      draggable
      onDragMove={(event) => {
        const newX = event.evt.x;
        const newY = event.evt.y;

        onMove(() => {
          emitMagnetUpdate({ ...magnet, x: newX, y: newY });
        });
      }}
      onClick={(e) => {
        e.evt.preventDefault();
        e.evt.stopPropagation();
        setSelectedMagnetId(magnet.id);
      }}
      scaleX={magnet.style?.scale}
      scaleY={magnet.style?.scale}
      stroke={selectedId === magnet.id ? "1px solid black" : undefined}
    />
  );
}
