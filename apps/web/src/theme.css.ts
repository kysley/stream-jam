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
} from "@radix-ui/colors";

export const [themeClass, vars] = createTheme({
  colors: {
    ...grayDark,
    ...blue,
    ...red,
    ...green,
    ...indigoDark,
  },
  radii: {
    1: "2px",
    2: "4px",
    3: "6px",
  },
});
