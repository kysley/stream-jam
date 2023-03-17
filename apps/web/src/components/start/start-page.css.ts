import { style } from "@vanilla-extract/css";

export const container = style({
	display: "grid",
	// flexDirection: "row",
	gridTemplateColumns: "1fr 1fr",
	height: "100%",
	justifyContent: "center",
	alignItems: "center",
	gap: 36,
});
