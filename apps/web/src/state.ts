import { useCallback } from "react";
import { create } from "zustand";
import { produce } from "structurajs";

export type Magnet = {
  id: string;
  x: number;
  y: number;
  url: string;
  scale?: number;
};

export const useRemoteMagnetStore = create<{
  magnets: Magnet[];
  actions: {
    updateRemoteMagnet(id: string, newState: Magnet): void;
    removeRemoteMagnet(id: string): void;
  };
}>((set) => ({
  magnets: [],
  actions: {
    updateRemoteMagnet(id, newState) {
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
        } else {
          state.magnets.push(newState);
          return {
            magnets: state.magnets,
          };
        }
      });
    },
    removeRemoteMagnet(id) {
      set((state) => {
        const m = produce(state.magnets, (draft) =>
          draft.filter((m) => m.id === id)
        );
        return {
          magnets: m,
        };
      });
    },
  },
}));

export const useRemoteMagnetIds = () =>
  useRemoteMagnetStore((state) => state.ids);
export const useRemoteMagnetActions = () =>
  useRemoteMagnetStore((state) => state.actions);

const useMagnetStore = create<{
  magnets: Magnet[];
  ids: string[];
  selected?: string;
  actions: {
    addMagnet(magnet: Magnet): void;
    setSelectedMagnetId(id?: string): void;
    updateMagnet(id: string, newState: Partial<Magnet>): Magnet | undefined;
  };
}>((set) => ({
  magnets: [],
  ids: [],
  selected: undefined,
  actions: {
    updateMagnet(id, newState) {
      let updated: Magnet | undefined;
      set((state) => {
        const target = state.magnets.findIndex((m) => m.id === id);
        if (target !== -1) {
          state.magnets[target] = { ...state.magnets[target], ...newState };
          updated = { ...state.magnets[target], ...newState };
          // const m = produce(state.magnets, (draft) => {
          //   console.log("producing");
          //   draft[target] = { ...draft[target], ...newState };
          //   updated = draft[target];
          //   // draft = { ...draft, newState };
          // });
          return {
            magnets: state.magnets,
          };
        }
      });
      if (updated) {
        return updated;
      }
      return undefined;
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
