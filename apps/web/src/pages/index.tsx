import {
  DndContext,
  useDroppable,
  useDraggable,
  DragStartEvent,
  DragEndEvent,
  DragMoveEvent,
} from "@dnd-kit/core";
import { ReactNode, useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { activeMagnet, magnetFamily } from "../state";
import { useThrottledCallback } from "@react-hookz/web";
import { useUpdateDraggedMagnet } from "../hooks/use-update-dragged-magnet";
import { useSocket } from "../hooks/use-socket";
import { useLocation } from "wouter";

export function IndexPage() {
  const [draggingMagnet, setDraggingMagnet] = useAtom(activeMagnet);
  const [remoteMagnets, setRemoteMagnets] = useState([]);
  const update = useUpdateDraggedMagnet();
  const onMove = useThrottledCallback((fn) => fn(), [], 200);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("update", (data) => {
        // Ignore our own updates
        if (data.socketId === socket.id) return;

        const target = remoteMagnets.findIndex(
          (magnet) => magnet?.id === data.data.id
        );
        let newMagnets = [...remoteMagnets];
        if (target !== -1) {
          newMagnets[target] = data.data;
          setRemoteMagnets(newMagnets);
        } else {
          newMagnets = [...newMagnets, data.data];
          setRemoteMagnets(newMagnets);
        }
      });
    }
  }, [socket, remoteMagnets]);

  function handleDragEnd(event: DragEndEvent) {}

  function handleDragStart(event: DragStartEvent) {
    setDraggingMagnet(event.active.id);
  }

  function handleDragMove(event: DragMoveEvent) {
    const newX = (event.active.rect.current.initial?.left || 0) + event.delta.x;
    const newY = (event.active.rect.current.initial?.top || 0) + event.delta.y;
    update((prev) => ({
      x: newX,
      y: newY,
    }));

    if (socket) {
      onMove(() => {
        socket.emit("update", {
          socketId: socket.id,
          data: {
            id: event.active.id + socket.id,
            x: newX,
            y: newY,
            imageUrl:
              "https://cdn.7tv.app/emote/63b77cae9d5b1683fdd05d21/3x.webp",
          },
        });
      });
    }
  }

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
      {remoteMagnets.length > 0 &&
        remoteMagnets.map((magnet) => (
          <Magnet
            id={magnet.id}
            imageUrl={magnet.imageUrl}
            key={magnet.id}
            disabled
            x={magnet.x}
            y={magnet.y}
          />
        ))}
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
  disabled?: boolean;
  x?: number;
  y?: number;
}) {
  const magnet = useAtomValue(magnetFamily(props.id));
  return (
    <div
      style={
        {
          position: "absolute",
          transform: `translate3d(${props.x || magnet?.x}px, ${
            props.y || magnet?.y
          }px, 0)`,
          // "--translate-y": `${magnet?.y ?? 0}px`,
        } as React.CSSProperties
      }
    >
      <Draggable id={props.id} disabled={props.disabled}>
        <img src={props.imageUrl} />
      </Draggable>
    </div>
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

function Draggable(props: {
  children: ReactNode;
  id: string;
  disabled?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    disabled: props.disabled,
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
