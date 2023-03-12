import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme.css";

export const button = recipe({
  base: {
    borderRadius: vars.radii[2],
    height: "35px",
    display: "flex",
    fontSize: "15px",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "600",
    border: "1px solid transparent",
    transition: "background-color, border-color ease-in .035s",
    width: "100%",
    padding: "0 .55rem",
    cursor: "pointer",
  },
  variants: {
    intent: {
      primary: {
        borderColor: vars.colors.primary.indigo7,
        backgroundColor: vars.colors.primary.indigo9,
        ":hover": {
          backgroundColor: vars.colors.primary.indigo10,
          borderColor: vars.colors.primary.indigo8,
        },
        ":active": {
          backgroundColor: vars.colors.primary.indigo8,
        },
        ":focus": {
          outline: "dotted thin",
          // Uses "color" otherwise, which is white
          outlineColor: vars.colors.primary.indigo8,
        },
      },
      danger: {
        borderColor: vars.colors.red7,
        backgroundColor: vars.colors.red9,
        ":hover": {
          backgroundColor: vars.colors.red10,
          borderColor: vars.colors.red8,
        },
        ":active": {
          backgroundColor: vars.colors.red8,
        },
        ":focus": {
          outline: "dotted thin",
          // Uses "color" otherwise, which is white
          outlineColor: vars.colors.red8,
        },
      },

      neutral: {
        borderColor: vars.colors.gray6,
        backgroundColor: vars.colors.gray7,
        ":hover": {
          backgroundColor: vars.colors.gray6,
          borderColor: vars.colors.gray8,
        },
        ":active": {
          backgroundColor: vars.colors.gray4,
        },
        ":focus": {
          outline: "dotted thin",
          // Uses "color" otherwise, which is white
          outlineColor: vars.colors.gray8,
        },
      },
    },
    type: {
      icon: {
        color: vars.colors.gray12,
        borderRadius: "6px",
        border: "1px solid transparent",
        padding: "2px 4px",
        cursor: "pointer",
        backgroundColor: "transparent",
        ":hover": {
          backgroundColor: vars.colors.gray4,
          // backgroundColor: "transparent",
          // border: `1px solid ${vars.colors.gray8}`,
          border: "1px solid transparent",
          // todo: figure out better button hover
          // transform: "scale(1.05)",
        },
        ":active": {
          backgroundColor: vars.colors.gray5,
          // backgroundColor: "transparent",
          // border: `1px solid ${vars.colors.gray8}`,
          border: "1px solid transparent",
        },
        ":focus": {
          outline: "none",
        },
      },
    },
  },
  defaultVariants: {
    intent: "neutral",
    type: undefined,
  },
  compoundVariants: [
    {
      variants: { type: "icon", intent: "danger" },
      style: {
        color: vars.colors.red9,
        ":hover": {
          backgroundColor: vars.colors.red4,
          // border: `1px solid ${vars.colors.red8}`,
        },
        ":active": {
          backgroundColor: vars.colors.red5,
          // border: `1px solid ${vars.colors.red8}`,
        },
        ":focus": {
          outline: "none",
        },
      },
    },
    {
      variants: { type: "icon", intent: "primary" },
      style: {
        color: vars.colors.primary.indigo9,
        ":hover": {
          backgroundColor: vars.colors.primary.indigo4,
          // border: `1px solid ${vars.colors.primary.indigo8}`,
        },
        ":active": {
          backgroundColor: vars.colors.primary.indigo5,
          // border: `1px solid ${vars.colors.primary.indigo8}`,
        },
        ":focus": {
          outline: "none",
        },
      },
    },
  ],
});

export type ButtonVariants = RecipeVariants<typeof button>;
