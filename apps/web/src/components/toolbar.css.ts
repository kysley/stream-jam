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
});

export const toolbarButton = style({
	color: "white",
	borderRadius: "6px",
	border: "1px solid transparent",
	display: "flex",
	padding: "2px 4px",
	cursor: "pointer",
	// backgroundColor: vars.colors.gray3,
	":hover": {
		backgroundColor: vars.colors.gray4,
		border: `1px solid ${vars.colors.gray7}`,
	},
	":active": {
		backgroundColor: vars.colors.gray5,
		border: `1px solid ${vars.colors.gray8}`,
	},
});
