import { Image } from "react-konva";
import { useState, useRef } from "react";
import { useMagnetActions, useManget, useSelectedMagnetId } from "../../state";
import useImage from "use-image";

type MagnetProps = {
  id: string;
  disabled?: boolean;
};
export function Magnet({ id, disabled }: MagnetProps) {
  const magnet = useManget(id);
  const ref = useRef<HTMLDivElement | null>(null);
  const [image] = useImage(magnet?.url || "");
  const { setSelectedMagnetId } = useMagnetActions();
  const selectedId = useSelectedMagnetId();
  const [selected, setSelected] = useState(false);

  // useEffect(() => {
  //   if (selected) {
  //     setSelectedMagnetId(id);
  //   } else {
  //     setSelectedMagnetId(undefined);
  //   }
  // }, [selected]);

  // useClickOutside(ref, () => setSelected(false));

  if (!magnet) {
    return null;
  }

  return (
    <Image
      image={image}
      draggable
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
