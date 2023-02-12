import {
  DndContext,
  useDroppable,
  useDraggable,
  DragStartEvent,
  DragEndEvent,
  DragMoveEvent,
} from "@dnd-kit/core";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { activeMagnet, magnetFamily, selectedMagnetIdAtom } from "../state";
import { useClickOutside, useThrottledCallback } from "@react-hookz/web";
import { useUpdateDraggedMagnet } from "../hooks/use-update-dragged-magnet";
import { useSocket } from "../hooks/use-socket";
import { QuickToolbar } from "../components/toolbar";
import { StreamPreview } from "../components/stream-preview";
import { MagnetEditor } from "../components/magnet-editor";

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
      {remoteMagnets.length > 0 &&
        remoteMagnets.map((magnet) => (
          <Magnet
            id={magnet.id}
            imageUrl={magnet.imageUrl}
            key={magnet.id}
            disabled
            x={magnet.x}
            y={magnet.y}
            className="magnet remote"
            // style={{ zIndex: 0 }}
          />
        ))}
      <Magnet
        imageUrl="https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.webp"
        id="test"
      />
      <Magnet
        imageUrl="https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.webp"
        id="test2"
      />
      <QuickToolbar />
      <StreamPreview />
      <MagnetEditor />
      <Droppable>
        <div>drop here</div>
      </Droppable>
    </DndContext>
  );
}

function Magnet(props: {
  imageUrl: string;
  id: string;
  disabled?: boolean;
  x?: number;
  y?: number;
  className?: string;
}) {
  const { attributes, listeners, setNodeRef, node } = useDraggable({
    id: props.id,
    disabled: props.disabled,
  });
  const magnet = useAtomValue(magnetFamily(props.id));
  const [selectedId, setSelectedMagnet] = useAtom(selectedMagnetIdAtom);
  const isSelected = selectedId === props.id;

  useClickOutside(node, () => isSelected && setSelectedMagnet(null));

  const className = props.className ?? "magnet";
  return (
    <div
      onMouseDown={() => {
        setSelectedMagnet(props.id);
      }}
      style={
        {
          ...(isSelected && {
            border: "2px solid black",
          }),
          position: "absolute",
          transform: `translate3d(${props.x || magnet?.x}px, ${
            props.y || magnet?.y
          }px, 0)`,
          // "--translate-y": `${magnet?.y ?? 0}px`,
        } as React.CSSProperties
      }
    >
      <img
        alt="magnet"
        src={props.imageUrl}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      />
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
