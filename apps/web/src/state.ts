import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { CSSProperties } from "react";

export type Magnet = {
  id: string;
  x: number;
  y: number;
  url: string;
  style?: CSSProperties;
};

export const magnetFamily = atomFamily((id: string) => atom<Magnet>({ id }));
export const activeMagnet = atom("");
export const selectedMagnetIdAtom = atom<string | null>(null);
export const quickMenuAtom = atom<"PHOTO" | "IMAGE" | null>(null);
