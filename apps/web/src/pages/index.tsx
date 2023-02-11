import {
  DndContext,
  useDroppable,
  useDraggable,
  DragStartEvent,
  DragEndEvent,
  DragMoveEvent,
} from "@dnd-kit/core";
import { ReactNode, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { activeMagnet, magnetFamily } from "../state";
import { useThrottledCallback } from "@react-hookz/web";
import { useUpdateDraggedMagnet } from "../hooks/use-update-dragged-magnet";

export function IndexPage() {
  const [draggingMagnet, setDraggingMagnet] = useAtom(activeMagnet);
  const update = useUpdateDraggedMagnet();
  const onMove = useThrottledCallback(
    (delta) => {
      console.log(delta);
    },
    [],
    200
  );

  function handleDragEnd(event: DragEndEvent) {}

  function handleDragStart(event: DragStartEvent) {
    console.log(event.active.id);
    setDraggingMagnet(event.active.id);
  }

  function handleDragMove(event: DragMoveEvent) {
    console.log(event.active.rect.current.initial, event.delta);
    update((prev) => ({
      x: (event.active.rect.current.initial?.left || 0) + event.delta.x,
      y: (event.active.rect.current.initial?.top || 0) + event.delta.y,
    }));
  }

  const magnets = [];
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      onDragStart={handleDragStart}
    >
      <Magnet
        imageUrl="https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.webp"
        id="test"
      />
      <Magnet
        imageUrl="https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.webp"
        id="test2"
      />
      <Droppable>
        <div>drop here</div>
      </Droppable>
    </DndContext>
  );
}

function Magnet(props: {
  imageUrl: string;
  handleDragStart(): void;
  id: string;
}) {
  const magnet = useAtomValue(magnetFamily(props.id));
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
      <Draggable id={props.id}>
        <img src={props.imageUrl} />
      </Draggable>
    </div>
  );
}

function Droppable(props: { children: ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
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

function Draggable(props: { children: ReactNode; id: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
