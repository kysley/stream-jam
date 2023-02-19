import {
  DndContext,
  useDroppable,
  DragStartEvent,
  DragEndEvent,
  DragMoveEvent,
} from "@dnd-kit/core";
import { ReactNode, useEffect, useState } from "react";
import { useMagnetIds } from "../state";
import { useThrottledCallback } from "@react-hookz/web";
import { useUpdateDraggedMagnet } from "../hooks/use-update-dragged-magnet";
import { useSocket } from "../hooks/use-socket";
import { QuickToolbar } from "../components/toolbar";
import { StreamPreview } from "../components/stream-preview";
import { MagnetEditor } from "../components/magnet-editor";
import { RemoteMagnet } from "../components/magnet/remote-magnet";
import { Magnet } from "../components/magnet/magnet";

export function IndexPage() {
  const [draggingMagnet, setDraggingMagnet] = useState<string | undefined>();
  const [remoteMagnets, setRemoteMagnets] = useState([]);

  const localMagnetIds = useMagnetIds();

  const update = useUpdateDraggedMagnet();
  const onMove = useThrottledCallback((fn) => fn(), [], 25);

  const socket = useSocket();

  useEffect(() => {
    // todo: turn this into a state slice
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
      update(draggingMagnet, {
        x: newX,
        y: newY,
      });

      if (socket) {
        onMove(() => {
          socket.emit("update", {
            socketId: socket.id,
            data: {
              id: event.active.id + socket.id,
              x: newX,
              y: newY,
              url: "https://cdn.7tv.app/emote/63b77cae9d5b1683fdd05d21/3x.webp",
            },
          });
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

// function Magnet(props: {
//   imageUrl: string;
//   id: string;
//   disabled?: boolean;
//   x?: number;
//   y?: number;
//   className?: string;
// }) {
//   const { attributes, listeners, setNodeRef, node } = useDraggable({
//     id: props.id,
//     disabled: props.disabled,
//   });
//   const magnet = useAtomValue(magnetFamily(props.id));
//   const [selectedId, setSelectedMagnet] = useAtom(selectedMagnetIdAtom);
//   const isSelected = selectedId === props.id;

//   useClickOutside(node, () => isSelected && setSelectedMagnet(null));

//   const className = props.className ?? "magnet";
//   return (
//     <div
//       onMouseDown={() => {
//         setSelectedMagnet(props.id);
//       }}
//       style={
//         {
//           ...(isSelected && {
//             border: "2px solid black",
//           }),
//           position: "absolute",
//           transform: `translate3d(${props.x || magnet?.x}px, ${
//             props.y || magnet?.y
//           }px, 0)`,
//           // "--translate-y": `${magnet?.y ?? 0}px`,
//         } as React.CSSProperties
//       }
//     >
//       <img
//         style={magnet.style}
//         alt="magnet"
//         src={props.imageUrl}
//         ref={setNodeRef}
//         {...listeners}
//         {...attributes}
//       />
//     </div>
//   );
// }

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
