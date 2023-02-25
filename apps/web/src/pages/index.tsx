import { useState } from "react";
import { useMagnetActions } from "../state";
import { useThrottledCallback } from "@react-hookz/web";
import { QuickToolbar } from "../components/toolbar";
import { MagnetEditor } from "../components/magnet-editor";
import { useEmitMagnetUpdate } from "../hooks/use-emit-magnet-update";
import { MagnetDisplay } from "../components/magnet-display";
import { Stage, Layer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { RemoteMagnetDisplay } from "../components/remote-magnet-display";

export function IndexPage() {
  const [draggingMagnet, setDraggingMagnet] = useState<string | undefined>();
  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  const { emitMagnetUpdate } = useEmitMagnetUpdate();

  const { updateMagnet, setSelectedMagnetId } = useMagnetActions();
  const onMove = useThrottledCallback((fn) => fn(), [], 25);

  // function handleDragEnd(event: DragEndEvent) {
  //   setDraggingMagnet(undefined);
  // }

  // function handleDragStart(event: DragStartEvent) {
  //   setDraggingMagnet(event.active.id.toString());
  // }

  // function handleDragMove(event: DragMoveEvent) {
  //   const newX = (event.active.rect.current.initial?.left || 0) + event.delta.x;
  //   const newY = (event.active.rect.current.initial?.top || 0) + event.delta.y;
  //   if (draggingMagnet) {
  //     const newMagnet = updateMagnet(draggingMagnet, {
  //       x: newX,
  //       y: newY,
  //     });

  //     if (newMagnet) {
  //       onMove(() => {
  //         emitMagnetUpdate(newMagnet);
  //       });
  //     }
  //   }
  // }

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
      <Stage
        style={{ backgroundColor: "gray" }}
        width={window.innerWidth}
        height={window.innerHeight * 0.5}
        onWheel={handleWheel}
        scaleX={stage.scale}
        scaleY={stage.scale}
        x={stage.x}
        y={stage.y}
        draggable
      >
        <Layer>
          <MagnetDisplay />
          <RemoteMagnetDisplay />
        </Layer>
      </Stage>

      <div className="container">
        <MagnetEditor />
        <QuickToolbar />
        {/* <StreamPreview /> */}
      </div>
    </div>
  );
}
