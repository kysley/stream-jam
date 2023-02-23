import { useDraggable } from "@dnd-kit/core";
import { useClickOutside } from "@react-hookz/web";
import { useEffect, useState } from "react";
import { useMagnetActions, useManget } from "../../state";

type MagnetProps = {
  id: string;
  disabled?: boolean;
};
export function Magnet({ id, disabled }: MagnetProps) {
  const magnet = useManget(id);
  const { attributes, listeners, setNodeRef, node } = useDraggable({
    id,
    disabled,
  });
  const { setSelectedMagnetId } = useMagnetActions();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selected) {
      setSelectedMagnetId(id);
    } else {
      setSelectedMagnetId(undefined);
    }
  }, [selected]);

  useClickOutside(node, () => setSelected(false));

  if (!magnet) {
    return null;
  }

  return (
    <div
      onMouseDown={() => {
        setSelected(true);
      }}
      style={
        {
          ...(selected && {
            outline: "2px solid red",
          }),
          position: "absolute",
          transform: `translate3d(${magnet?.x}px, ${magnet?.y}px, 0)`,
          zIndex: 100,
        } as React.CSSProperties
      }
    >
      <img
        style={magnet.style}
        alt="magnet"
        src={magnet.url}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      />
    </div>
  );
}
