import { useDraggable } from "@dnd-kit/core";
import { useClickOutside } from "@react-hookz/web";
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

  // const isSelected = selectedId === props.id
  const isSelected = true;

  useClickOutside(node, () => isSelected && setSelectedMagnetId(undefined));

  // const className = props.className ?? "magnet";

  if (!magnet) {
    return null;
  }

  return (
    <div
      onMouseDown={() => {
        setSelectedMagnetId(magnet.id);
      }}
      style={
        {
          ...(isSelected && {
            border: "2px solid black",
          }),
          position: "absolute",
          transform: `translate3d(${magnet?.x}px, ${magnet?.y}px, 0)`,
          // "--translate-y": `${magnet?.y ?? 0}px`,
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
