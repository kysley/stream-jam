import { Magnet } from "../../state";

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
          zIndex: 100,
        } as React.CSSProperties
      }
    >
      <img style={magnet.style} alt="magnet" src={magnet.url} />
    </div>
  );
}
