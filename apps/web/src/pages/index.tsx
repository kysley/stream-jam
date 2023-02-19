import {
  DndContext,
  useDroppable,
  DragStartEvent,
  DragEndEvent,
  DragMoveEvent,
} from "@dnd-kit/core";
import { ReactNode, useCallback, useState } from "react";
import { useMagnetActions, useMagnetIds, useRemoteMagnetStore } from "../state";
import { useThrottledCallback } from "@react-hookz/web";
import { useUpdateDraggedMagnet } from "../hooks/use-update-dragged-magnet";
import { QuickToolbar } from "../components/toolbar";
import { StreamPreview } from "../components/stream-preview";
import { MagnetEditor } from "../components/magnet-editor";
import { RemoteMagnet } from "../components/magnet/remote-magnet";
import { Magnet } from "../components/magnet/magnet";
import { useEmitMagnetUpdate } from "../hooks/use-emit-magnet-update";
import { useListenForMagnetUpdate } from "../hooks/use-listen-for-magnet-update";

export function IndexPage() {
  const [draggingMagnet, setDraggingMagnet] = useState<string | undefined>();

  const remoteMagnets = useRemoteMagnetStore(
    useCallback((state) => state.magnets, [])
  );
  useListenForMagnetUpdate();
  const { emitMagnetUpdate } = useEmitMagnetUpdate();

  const localMagnetIds = useMagnetIds();

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
      {remoteMagnets.length > 0 &&
        remoteMagnets.map((magnet) => (
          <RemoteMagnet key={magnet.id} magnet={magnet} />
        ))}
      {localMagnetIds.length > 0 &&
        localMagnetIds.map((id) => <Magnet key={id} id={id} />)}
      <QuickToolbar />
      <StreamPreview />
      <MagnetEditor />
      <Droppable>
        <div>drop here</div>
      </Droppable>
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
