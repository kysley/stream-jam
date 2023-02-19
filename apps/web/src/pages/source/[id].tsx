import { useRoute } from "wouter";
import { RemoteMagnetDisplay } from "../../components/remote-magnet-display";

export function SourceIdPage() {
  const [match, params] = useRoute("/source/:id");

  if (!match) return <span>404</span>;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        transform: "scale(1.67)",
        // position: "absolute",
        justifySelf: "center",
        // top: 5,
        backgroundColor: "grey",
        // zIndex: -1,
      }}
    >
      <RemoteMagnetDisplay />
    </div>
  );
}
