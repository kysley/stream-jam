import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme.css";

const slideDownAndFade = keyframes({
	"0%": { opacity: 0, transform: "translateY(-2px)" },
	"100%": { opacity: 1, transform: "translateY(0)" },
});

export const PopoverContent = style({
	zIndex: 100,
	// position: "absolute",
	// top: "125px",
	// right: "25px",
	display: "flex",
	flexDirection: "column",
	padding: "12px",
	borderRadius: vars.radii[2],
	backgroundColor: vars.colors.gray2,
	boxShadow:
		"rgba(0, 0, 0, 0.1) 0px 10px 38px -10px, rgba(0, 0, 0, 0.2) 0px 10px 20px -15px",
	border: `1px solid ${vars.colors.gray6}`,
	gap: "4px",
	// width: "300px",
	// backgroundColor: vars.colors.gray4,
	// borderRadius: 6,
	// boxShadow:
	// 	"rgba(0, 0, 0, 0.1) 0px 10px 38px -10px, rgba(0, 0, 0, 0.2) 0px 10px 20px -15px",
	// // padding: 20,
	// // position: "fixed",
	// border: `1px solid ${vars.colors.gray6}`,
	// // top: "50%",
	// // left: "50%",
	// // transform: "translate(-50%, -50%)",
	// // width: "90vw",
	// width: "200px",
	// display: "flex",
	// flexDirection: "column",
	// gap: 4,
	// // maxHeight: "85vh",
	// padding: 8,
	// lineHeight: 1,
	// animation: `${slideDownAndFade} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
	// ":focus": { outline: "none" },
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
