import { createTheme } from "@vanilla-extract/css";
import {
	gray,
	blue,
	red,
	green,
	indigoDark,
	yellow,
	grayDark,
	blueDark,
	redDark,
	greenDark,
	plumDark,
	blackA,
} from "@radix-ui/colors";

export const [themeClass, vars] = createTheme({
	colors: {
		...grayDark,
		...blue,
		...redDark,
		...green,
		...blackA,
		primary: indigoDark,
	},
	radii: {
		1: "2px",
		2: "4px",
		3: "6px",
	},
});
