import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export const magnetFamily = atomFamily((id: string) => atom({ id }));
export const activeMagnet = atom("");
