import {
  DndContext,
  useDroppable,
  DragStartEvent,
  DragEndEvent,
  DragMoveEvent,
} from "@dnd-kit/core";
import { ReactNode, useState } from "react";
import { useMagnetActions } from "../state";
import { useThrottledCallback } from "@react-hookz/web";
import { QuickToolbar } from "../components/toolbar";
import { StreamPreview } from "../components/stream-preview";
import { MagnetEditor } from "../components/magnet-editor";
import { useEmitMagnetUpdate } from "../hooks/use-emit-magnet-update";
import { RemoteMagnetDisplay } from "../components/remote-magnet-display";
import { MagnetDisplay } from "../components/magnet-display";

export function IndexPage() {
  const [draggingMagnet, setDraggingMagnet] = useState<string | undefined>();

  const { emitMagnetUpdate } = useEmitMagnetUpdate();

  const { updateMagnet } = useMagnetActions();
  const onMove = useThrottledCallback((fn) => fn(), [], 25);

  function handleDragEnd(event: DragEndEvent) {
    setDraggingMagnet(undefined);
  }

  function handleDragStart(event: DragStartEvent) {
    setDraggingMagnet(event.active.id.toString());
  }

  function handleDragMove(event: DragMoveEvent) {
    const newX = (event.active.rect.current.initial?.left || 0) + event.delta.x;
    const newY = (event.active.rect.current.initial?.top || 0) + event.delta.y;
    if (draggingMagnet) {
      const newMagnet = updateMagnet(draggingMagnet, {
        x: newX,
        y: newY,
      });

      if (newMagnet) {
        onMove(() => {
          emitMagnetUpdate(newMagnet);
        });
      }
    }
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      onDragStart={handleDragStart}
    >
      <RemoteMagnetDisplay />
      <MagnetDisplay />
      <div className="container">
        <MagnetEditor />
        <QuickToolbar />
        <StreamPreview />
      </div>
      {/* <Droppable>
        <div>drop here</div>
      </Droppable> */}
    </DndContext>
  );
}

function Droppable(props: { children: ReactNode; disabled?: boolean }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
    disabled: props.disabled,
  });
  const style = {
    color: isOver ? "blue" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
