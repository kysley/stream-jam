import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../theme.css";

export const slideUp = keyframes({
	from: {
		transform: "translateY(3px)",
		opacity: 0,
	},
	to: {
		transform: "translateY(-3px)",
		opacity: 1,
	},
});

export const confirmation = style({
	display: "flex",
	position: "absolute",
	backgroundColor: vars.colors.gray2,
	outline: `1px solid ${vars.colors.gray6}`,
	borderRadius: vars.radii[2],
	top: -45,
	transform: "translateY(-5px)",
	left: 0,
	justifyContent: "space-between",
	zIndex: 0,
	width: "100%",
	padding: "4px 8px",
	alignItems: "center",
	animation: `.035s ease-out ${slideUp}`,
});

export const editorContainer = style({
	position: "absolute",
	top: "275px",
	right: "25px",
	display: "flex",
	flexDirection: "column",
	gap: "12px",
	width: "300px",
	zIndex: 999999,
});

export const sliderRoot = style({
	position: "relative",
	display: "flex",
	alignItems: "center",
	userSelect: "none",
	touchAction: "none",
	height: "20px",
	cursor: "pointer",
});

export const sliderTrack = style({
	backgroundColor: vars.colors.gray5,
	position: "relative",
	flexGrow: 1,
	borderRadius: "99999px",
	height: "3px",
});

export const sliderRange = style({
	position: "absolute",
	backgroundColor: vars.colors.primary.indigo9,
	borderRadius: "90999px",
	height: "100%",
});

export const sliderThumb = style({
	display: "block",
	height: "20px",
	width: "20px",
	backgroundColor: "white",
	boxShadow: `0px 2px 10px ${vars.colors.gray4}`,
	borderRadius: "10px",
	transition: "all ease-in .05s",
	":focus": {
		height: "18px",
		width: "18px",
	},
	":hover": {
		outline: "none",
		boxShadow: `0px 2px 10px ${vars.colors.gray5}`,
	},
	":active": {},
});
