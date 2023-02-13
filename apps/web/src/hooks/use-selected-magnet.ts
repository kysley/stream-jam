import { useAtom, useAtomValue } from "jotai";
import { magnetFamily, selectedMagnetIdAtom } from "../state";

export function useSelectedMagnet() {
  const selectedMagnetId = useAtomValue(selectedMagnetIdAtom);
  const [magnet, setMagnet] = useAtom(magnetFamily(selectedMagnetId));

  return { magnet, setMagnet };
}
