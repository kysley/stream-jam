import { create } from "zustand";
import type { Magnet, WrappedMagnet } from "./state.types";
import { produce } from "structurajs";
import { unwrapMagnet } from "../utils";

export const useRemoteMagnetStore = create<{
	magnets: Magnet[];
	actions: {
		loadRemoteMagnets(magnets: WrappedMagnet[]): void;
		updateRemoteMagnet(id: string, newState: Magnet): void;
		removeRemoteMagnet(id: string): void;
	};
}>((set) => ({
	magnets: [],
	actions: {
		loadRemoteMagnets(magnets) {
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
				};
			});
		},
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
				}
				state.magnets.push(newState);
				return {
					magnets: state.magnets,
				};
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
