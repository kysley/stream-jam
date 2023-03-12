import { Magnet } from "../../state";
import { MagnetRenderer } from "./magnet";

type MagnetProps = {
  magnet: Magnet;
  source: boolean;
};
export function RemoteMagnet({ magnet, source }: MagnetProps) {
  if (!magnet) {
    return null;
  }

  return (
    // todo: the stroke looks great on the dorito gif, but its almost invisivle on the default image. wonder why
    // probably won't need a stroke once we are rendering display names for remote magnets
    <MagnetRenderer
      magnet={magnet}
      stroke={source ? undefined : "orange"}
      strokeWidth="5px"
      // displayName="remote_test"
      // draggable
      // Update last x,y so when/if the magnet redeners it will stay in place (changing image/gif)
      // onDragEnd={(event) => {
      //   const lastX = event.target.attrs.x;
      //   const lastY = event.target.attrs.y;

      //   updateMagnet(magnet.id, { x: lastX, y: lastY });
      // }}
      // onDragMove={(event) => {
      //   const newX = event.target.attrs.x;
      //   const newY = event.target.attrs.y;

      //   onMove(() => {
      //     emitMagnetUpdate({ ...magnet, x: newX, y: newY });
      //   });
      // }}
      // onClick={(e) => {
      //   setSelectedMagnetId(magnet.id);
      // }}
      scaleX={magnet?.scale}
      scaleY={magnet?.scale}
      // selected={selectedId === magnet.id}
      x={magnet?.x}
      y={magnet?.y}
      height={magnet?.height}
      width={magnet?.width}
    />
  );
}
