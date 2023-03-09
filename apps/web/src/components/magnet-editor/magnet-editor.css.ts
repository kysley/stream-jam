import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css";

export const editorContainer = style({
  position: "absolute",
  top: "75px",
  right: "25px",
  display: "flex",
  flexDirection: "column",
  padding: "12px",
  borderRadius: "3px",
  backgroundColor: vars.colors.gray2,
  gap: "12px",
  width: "300px",
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
  backgroundColor: vars.colors.gray2,
  position: "relative",
  flexGrow: 1,
  borderRadius: "99999px",
  height: "3px",
});

export const sliderRange = style({
  position: "absolute",
  backgroundColor: vars.colors.indigo10,
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
    backgroundColor: vars.colors.indigo9,
    height: "18px",
    width: "18px",
  },
  ":hover": {
    outline: "none",
    boxShadow: `0px 2px 10px ${vars.colors.gray5}`,
  },
  ":active": {},
});
