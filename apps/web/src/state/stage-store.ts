import { create } from "zustand";
import { shallow } from "zustand/shallow";

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
	scale: 0.4,
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
		shallow,
	);
