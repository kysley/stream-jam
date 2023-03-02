import { useState } from "react";
import { QuickToolbar } from "../components/toolbar";
import { MagnetEditor } from "../components/magnet-editor";
import { MagnetDisplay } from "../components/magnet-display";
import { Stage, Layer, Group } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { RemoteMagnetDisplay } from "../components/remote-magnet-display";
import { Html } from "react-konva-utils";
import { StreamPreview } from "../components/stream-preview";
import { useMagnetActions } from "../state";
import { trpc } from "../utils/trpc";

export function IndexPage() {
  const { data } = trpc.me.useQuery();
  const [stage, setStage] = useState({
    scale: 0.5,
    x: 0,
    y: 0,
  });
  const [allowIframeFocus, setAllowIframeFocus] = useState(false);

  const { setSelectedMagnetId } = useMagnetActions();

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    if (!stage) return;
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStage({
      scale: newScale,
      x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
      y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale,
    });
  };

  return (
    <div>
      <div className="container">
        <MagnetEditor />
        <QuickToolbar
          handleIframeFocusChange={() => setAllowIframeFocus((p) => !p)}
        />
      </div>
      <Stage
        // style={{ backgroundColor: "gray" }}
        width={window.innerWidth}
        height={window.innerHeight}
        onWheel={handleWheel}
        scaleX={stage.scale}
        scaleY={stage.scale}
        x={stage.x}
        y={stage.y}
        draggable
        onMouseDown={(e) => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            setSelectedMagnetId(undefined);
          }
        }}
      >
        <Layer>
          <Group x={1920 / 2} y={1080 / 3}>
            <Html
              divProps={{
                style: {
                  zIndex: allowIframeFocus ? undefined : -1,
                },
              }}
            >
              <StreamPreview />
            </Html>
          </Group>
          <MagnetDisplay />
          <RemoteMagnetDisplay />
        </Layer>
      </Stage>
    </div>
  );
}
