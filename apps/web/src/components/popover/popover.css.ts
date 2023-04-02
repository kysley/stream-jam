import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme.css";

const slideDownAndFade = keyframes({
	"0%": { opacity: 0, transform: "translateY(-2px)" },
	"100%": { opacity: 1, transform: "translateY(0)" },
});

export const PopoverContent = style({
	zIndex: 100,
	display: "flex",
	flexDirection: "column",
	gap: "4px",
});

export const PopoverItem = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-start",
	cursor: "pointer",
	padding: "4px 4px",
	gap: 4,
	borderRadius: vars.radii[2],
	":hover": {
		backgroundColor: vars.colors.gray6,
	},
});

export const PopoverTitle = style({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: "0 0 12px 0",
	fontWeight: "bold",
});
