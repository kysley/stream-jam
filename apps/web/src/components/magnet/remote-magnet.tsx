import { useDraggable } from "@dnd-kit/core";
import { useClickOutside } from "@react-hookz/web";
import { Magnet, useMagnetActions, useManget } from "../../state";

type RemoteMagnetProps = {
  magnet: Magnet;
};
export function RemoteMagnet({ magnet }: RemoteMagnetProps) {
  if (!magnet) {
    return null;
  }

  return (
    <div
      style={
        {
          position: "absolute",
          transform: `translate3d(${magnet?.x}px, ${magnet?.y}px, 0)`,
          // "--translate-y": `${magnet?.y ?? 0}px`,
        } as React.CSSProperties
      }
    >
      <img style={magnet.style} alt="magnet" src={magnet.url} />
    </div>
  );
}
