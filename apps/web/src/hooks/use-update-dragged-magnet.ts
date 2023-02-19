import { useMagnetActions } from "../state";

export function useUpdateDraggedMagnet() {
  const { updateMagnet } = useMagnetActions();

  return updateMagnet;
}
