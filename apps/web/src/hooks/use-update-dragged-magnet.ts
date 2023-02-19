import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  activeMagnet,
  magnetFamily,
  useMagnetActions,
  useSelectedMagnetId,
} from "../state";
import { useSelectedMagnet } from "./use-selected-magnet";

export function useUpdateDraggedMagnet() {
  const magnetId = useSelectedMagnetId();
  const { updateMagnet } = useMagnetActions();

  return updateMagnet;
}
