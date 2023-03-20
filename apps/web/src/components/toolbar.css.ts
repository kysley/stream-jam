import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const toolbarContainer = style({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: "4px 8px",
	backgroundColor: vars.colors.gray2,
	borderRadius: "5px",
	pointerEvents: "all",
	gap: "4px",
	height: 35,
});
