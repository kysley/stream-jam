import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css";

// We want this to have a distinct visual identity compared to a neutral button or input
export const selectTrigger = style({
	border: "1px solid transparent",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "space-between",
	borderRadius: vars.radii[3],
	padding: "0 0 0 8px",
	height: "35px",
	fontSize: "15px",
	lineHeight: "35px",
	cursor: "pointer",
	transition: "background-color, border-color ease-in .035s",
	// minWidth: 125,

	gap: 25,
	// borderColor: vars.colors.gray6,
	backgroundColor: vars.colors.gray3,
	":hover": {
		backgroundColor: vars.colors.gray4,
		borderColor: vars.colors.gray8,
	},
	// ":active": {
	// 	backgroundColor: vars.colors.gray4,
	// },
	":focus": {
		outline: "dotted thin",
		// Uses "color" otherwise, which is white
		outlineColor: vars.colors.gray8,
	},
	selectors: {
		"&[data-placeholder]": { color: vars.colors.gray12 },
		"&[data-state='open']": { backgroundColor: vars.colors.gray5 },
	},
});

export const selectIcon = style({
	color: vars.colors.gray12,
	lineHeight: 1,
});

export const selectContent = style({
	overflow: "hidden",
	zIndex: "9999",
	width: "var(--radix-select-trigger-width)",
	maxHeight: "var(--radix-select-content-available-height)",
});

export const selectViewport = style({});

export const selectItem = style({
	fontSize: 15,
	lineHeight: 1,
	color: vars.colors.gray12,
	borderRadius: 3,
	display: "flex",
	alignItems: "center",
	padding: "8px",
	position: "relative",
	userSelect: "none",
	cursor: "pointer",

	selectors: {
		"&[data-disabled]": {
			color: vars.colors.gray5,
			pointerEvents: "none",
		},

		"&[data-highlighted]": {
			outline: "none",
			backgroundColor: vars.colors.gray9,
		},
	},
});

export const selectLabel = style({
	padding: "0 25px",
	fontSize: 12,
	lineHeight: "25px",
	color: vars.colors.primary.indigo1,
});

export const selectSeparator = style({
	height: 1,
	backgroundColor: vars.colors.primary.indigo6,
	margin: 5,
});

export const styleItemIndicator = style({
	position: "absolute",
	left: 0,
	width: 25,
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
});

export const scrollButtonStyles = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: 25,
	backgroundColor: "white",
	color: vars.colors.primary.indigo11,
	cursor: "default",
};

const SelectScrollUpButton = style(scrollButtonStyles);

const SelectScrollDownButton = style(scrollButtonStyles);
