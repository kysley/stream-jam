import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export const magnetFamily = atomFamily((id: string) => atom({ id }));
export const activeMagnet = atom("");
export const selectedMagnetIdAtom = atom<string | null>(null);
export const quickMenuAtom = atom<"PHOTO" | "IMAGE" | null>(null);
