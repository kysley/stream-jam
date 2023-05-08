import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css";

export const Page = style({
	display: "flex",
	flexDirection: "column",
	height: "100%",
	padding: "0 5vw",
	paddingTop: "5vh",
});

export const PageTitle = style({
	fontSize: "3rem",
});

export const DashboardGrid = style({
	display: "grid",
	gridTemplateColumns: "repeat(4, 1fr)",
	gridAutoFlow: "row",
});

export const DashboardSection = style({
	gridColumn: "1 / 5",
	backgroundColor: vars.colors.gray2,
	padding: 12,
	gap: 16,
	borderRadius: vars.radii[1],
	display: "flex",
	flexDirection: "column",
});

export const DashboardImage = style({
	width: "auto",
	height: 120,
	backgroundColor: vars.colors.gray3,
	boxShadow: "rgba(0, 0, 0, 0.07) 0px 2px 10px",
	cursor: "pointer",
	transition: "all .1s ease-in",
	":hover": {
		transform: "translateY(-2px)",
		boxShadow: "rgba(0, 0, 0, 0.07) 0px 2px 15px",
	},
});

export const Stat = style({
	backgroundColor: vars.colors.gray3,
	borderRadius: vars.radii[2],
	display: "flex",
	alignItems: "flex-end",
	flexDirection: "column",
	padding: "8px 16px",
});

export const StatText = style({
	fontSize: "1rem",
	fontWeight: "initial",
	margin: 0,
});
export const StatValue = style({ fontSize: "3rem", fontWeight: 600 });

export const DashboardTitle = style({ margin: 0 });

export const container = style({
	display: "grid",
	// flexDirection: "row",
	gridTemplateColumns: "1fr 1fr",
	height: "100%",
	justifyContent: "center",
	alignItems: "center",
	gap: 36,
});
