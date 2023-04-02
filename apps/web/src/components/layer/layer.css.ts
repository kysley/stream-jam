import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css";

export const layerStyles = style({
	padding: "12px",
	borderRadius: vars.radii[2],
	backgroundColor: vars.colors.gray2,
	boxShadow:
		"rgba(0, 0, 0, 0.1) 0px 10px 38px -10px, rgba(0, 0, 0, 0.2) 0px 10px 20px -15px",
	border: `1px solid ${vars.colors.gray6}`,
});
