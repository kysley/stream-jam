import { useCallback } from "react";
import { create } from "zustand";
import { Magnet } from "./state.types";

const useEditorStore = create<{
	magnet?: Magnet;
	actions: {
		clear(): void;
		// save(): void;
		load(magnet: Magnet): void;
		update(newState: Partial<Magnet>): Magnet | undefined;
	};
}>((set) => ({
	magnet: undefined,
	actions: {
		update(newState) {
			set((state) => {
				if (!state.magnet) {
					return state;
				}
				state.magnet = { ...state.magnet, ...newState };
				// const m = produce(state.magnets, (draft) => {
				//   console.log("producing");
				//   draft[target] = { ...draft[target], ...newState };
				//   updated = draft[target];
				//   // draft = { ...draft, newState };
				// });
				return {
					magnet: state.magnet,
				};
			});
			return undefined;
		},
		load(magnet) {
			set((state) => {
				state.magnet = magnet;
				return {
					magnet: state.magnet,
				};
			});
		},
		clear() {
			set((state) => {
				state.magnet = undefined;
				return {
					magnet: state.magnet,
				};
			});
		},
	},
}));

export const useEditor = () =>
	useEditorStore(useCallback((state) => state, []));
export const useEditorState = () => useEditorStore((state) => state.magnet);
export const useEditorActions = () => useEditorStore((state) => state.actions);
