import { create } from "zustand";
import type { Magnet } from "./state.types";
import { produce } from "structurajs";

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
					draft.filter((m) => m.id === id),
				);
				return {
					magnets: m,
				};
			});
		},
	},
}));

export const useRemoteMagnetActions = () =>
	useRemoteMagnetStore((state) => state.actions);
