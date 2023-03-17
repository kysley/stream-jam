import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme.css";

const overlayShow = keyframes({
	"0%": { opacity: 0 },
	"100%": { opacity: 1 },
});

const contentShow = keyframes({
	"0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
	"100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

export const DialogOverlay = style({
	// backgroundColor: vars.colors.gray1,
	position: "fixed",
	inset: 0,
	animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const DialogContent = style({
	zIndex: 100,
	backgroundColor: vars.colors.gray4,
	borderRadius: 6,
	boxShadow:
		"hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90vw",
	maxWidth: "450px",
	maxHeight: "85vh",
	padding: 25,
	animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
	":focus": { outline: "none" },
});

export const DialogTitle = style({
	margin: 0,
	fontWeight: 500,
	color: vars.colors.blue12,
	fontSize: 17,
});

export const DialogDescription = style({
	margin: "10px 0 20px",
	color: vars.colors.blue11,
	fontSize: 15,
	lineHeight: 1.5,
});

const Flex = style({ display: "flex" });
