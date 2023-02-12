import { useAtomValue } from "jotai";
import { magnetFamily, selectedMagnetIdAtom } from "../state";

export function useSelectedMagnet() {
  const selectedMagnetId = useAtomValue(selectedMagnetIdAtom);
  const magnet = useAtomValue(magnetFamily(selectedMagnetId));

  if (!selectedMagnetId) return null;

  return magnet;
}
