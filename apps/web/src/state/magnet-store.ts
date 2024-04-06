import { useCallback } from "react";
import { create } from "zustand";
import type { Magnet, WrappedMagnet } from "./state.types";
import { unwrapMagnet } from "../utils";
import { produce } from "structurajs";

const useMagnetStore = create<{
	magnets: Magnet[];
	ids: string[];
	selected?: string;
	actions: {
		loadMagnets(magnets: WrappedMagnet[]): void;
		setSelectedMagnetId(id?: string): void;
		addMagnet(magnet: Magnet): void;
		removeMagnet(id: string): void;
		updateMagnet(id: string, newState: Partial<Magnet>): Magnet | undefined;
	};
}>((set) => ({
	magnets: [],
	ids: [],
	selected: undefined,
	actions: {
		removeMagnet(id) {
			set((state) => {
				const newMagnets = state.magnets.filter((m) => m.id !== id);
				return {
					ids: newMagnets.map((m) => m.id),
					magnets: newMagnets,
				};
			});
		},
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
		loadMagnets(magnets) {
			set((state) => {
				const m = produce(state.magnets, (draft) => {
					for (const magnet of magnets) {
						const target = state.magnets.findIndex((m) => m.id === magnet.id);

						if (target !== -1) {
							draft[target] = unwrapMagnet(magnet);
						} else {
							draft.push(unwrapMagnet(magnet));
						}
					}
				});
				return {
					magnets: m,
					ids: m.map((m) => m.id),
				};
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
		useCallback((state) => state.magnets.find((m) => m.id === id), [id]),
	);
export const useMagnetIds = () => useMagnetStore((state) => state.ids);
export const useMagnetActions = () => useMagnetStore((state) => state.actions);
