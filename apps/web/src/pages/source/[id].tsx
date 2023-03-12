import { Layer, Stage } from "react-konva";
import { useRoute } from "wouter";
import { RemoteMagnetDisplay } from "../../components/remote-magnet-display";

export function SourceIdPage() {
  const [match, params] = useRoute("/source/:id");

  if (!match) return <span>404</span>;

  return (
    <Stage x={-(1920 / 2)} y={-(1080 / 3)} width={1920} height={1080}>
      <Layer>
        <RemoteMagnetDisplay source />
      </Layer>
    </Stage>
  );
}
