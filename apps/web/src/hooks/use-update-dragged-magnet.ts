import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { activeMagnet, magnetFamily } from "../state";

export function useUpdateDraggedMagnet() {
  const draggedMagnetId = useAtomValue(activeMagnet);
  const setDraggedMagnet = useSetAtom(magnetFamily(draggedMagnetId));

  return setDraggedMagnet;
}
