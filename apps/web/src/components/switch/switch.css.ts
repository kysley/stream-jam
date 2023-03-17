import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css";

export const switchRoot = style({
	all: "unset",
	width: 42,
	height: 25,
	backgroundColor: vars.colors.gray4,
	borderRadius: "9999px",
	position: "relative",
	cursor: "pointer",
	// boxShadow: `0 2px 10px ${blackA.blackA7}`,
	WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
	border: "1px solid transparent",
	":hover": {
		outline: "none",
		border: "1px solid transparent",
	},
	":focus": {
		outline: "none",
		border: "1px solid transparent",
	},
	selectors: {
		'&[data-state="checked"]': { backgroundColor: vars.colors.indigo10 },
	},
});

export const switchThumb = style({
	display: "block",
	width: 21,
	height: 21,
	backgroundColor: "white",
	borderRadius: "9999px",
	// boxShadow: `0 2px 2px ${blackA.blackA7}`,
	transition: "transform 100ms",
	transform: "translateX(2px)",
	willChange: "transform",
	selectors: {
		'&[data-state="checked"]': { transform: "translateX(19px)" },
	},
});
