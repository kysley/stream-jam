import { useCallback } from "react";
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { produce } from "structurajs";

export type Magnet =
  | {
      type: "media";
      id: string;
      x: number;
      y: number;
      height?: number;
      width?: number;
      url: string;
      scale: number;
      visible: boolean;
    }
  | {
      type: "text";
      id: string;
      x: number;
      y: number;
      height?: number;
      width?: number;
      text: string;
      scale: number;
      visible: boolean;
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
export const useManget = (id?: string) =>
  useMagnetStore(
    useCallback((state) => state.magnets.find((m) => m.id === id), [id])
  );
export const useMagnetIds = () => useMagnetStore((state) => state.ids);
export const useMagnetActions = () => useMagnetStore((state) => state.actions);

export const useStageStore = create<{
  scale: number;
  x: number;
  y: number;
  focusIFrame: boolean;
  actions: {
    setScale(newScale: number): void;
    setCoords(x: number, y: number): void;
    toggleIFrameFocus(): void;
  };
}>((set) => ({
  scale: 0.5,
  x: 0,
  y: 0,
  focusIFrame: false,
  actions: {
    setCoords(x, y) {
      set({ x, y });
    },
    setScale(newScale) {
      set({ scale: newScale });
    },
    toggleIFrameFocus() {
      set((state) => ({ focusIFrame: !state.focusIFrame }));
    },
  },
}));

export const useStageActions = () => useStageStore((state) => state.actions);
export const useStageState = () =>
  useStageStore(
    (state) => ({ x: state.x, y: state.y, scale: state.scale }),
    shallow
  );
