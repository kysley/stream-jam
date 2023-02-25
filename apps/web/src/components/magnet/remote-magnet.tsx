import { Image } from "react-konva";
import useImage from "use-image";
import { Magnet } from "../../state";

type RemoteMagnetProps = {
  magnet: Magnet;
};
export function RemoteMagnet({ magnet }: RemoteMagnetProps) {
  const [image] = useImage(magnet.url || "");

  if (!magnet) {
    return null;
  }

  return (
    <Image
      opacity={0.37}
      image={image}
      scaleX={magnet?.scale}
      scaleY={magnet?.scale}
      x={magnet.x}
      y={magnet.y}
    />
  );
}
