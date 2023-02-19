import { CSSProperties, useCallback } from "react";
import { create } from "zustand";
import { produce } from "structurajs";

export type Magnet = {
  id: string;
  x: number;
  y: number;
  url: string;
  style?: CSSProperties;
};

const useMagnetStore = create<{
  magnets: Magnet[];
  ids: string[];
  selected?: string;
  actions: {
    addMagnet(magnet: Magnet): void;
    setSelectedMagnetId(id?: string): void;
    updateMagnet(id: string, newState: Partial<Magnet>): void;
  };
}>((set) => ({
  magnets: [],
  ids: [],
  selected: undefined,
  actions: {
    updateMagnet(id, newState) {
      set((state) => {
        const target = state.magnets.findIndex((m) => m.id === id);
        if (target !== -1) {
          const m = produce(state.magnets, (draft) => {
            draft[target] = { ...draft[target], ...newState };
            // draft = { ...draft, newState };
          });
          return {
            magnets: m,
          };
        }
      });
    },
    setSelectedMagnetId(id) {
      set((state) => {
        if (!id) {
          return {
            selected: undefined,
          };
        }
        const target = state.magnets.findIndex((m) => m.id === id);
        if (target !== -1) {
          return {
            selected: state.magnets[target].id,
          };
        }
      });
    },
    addMagnet(magnet) {
      set((state) => {
        state.magnets.push(magnet);
        return {
          ids: [...state.magnets.map((magnet) => magnet.id)],
          magnets: state.magnets,
        };
      });
    },
  },
}));

export const useSelectedMagnetId = () =>
  useMagnetStore((state) => state.selected);
export const useManget = (id: string) =>
  useMagnetStore(
    useCallback((state) => state.magnets.find((m) => m.id === id), [id])
  );
export const useMagnetIds = () => useMagnetStore((state) => state.ids);
export const useMagnetActions = () => useMagnetStore((state) => state.actions);
