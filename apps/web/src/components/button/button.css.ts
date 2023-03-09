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
    padding: "0 15px",
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

      neutral: {
        // borderColor: vars.colors.gray7,
        // backgroundColor: vars.colors.gray9,
        borderColor: "none",
        backgroundColor: "none",
        ":hover": {
          backgroundColor: vars.colors.gray5,
          borderColor: vars.colors.gray8,
        },
        ":active": {
          backgroundColor: vars.colors.gray8,
        },
        ":focus": {
          outline: "dotted thin",
          // Uses "color" otherwise, which is white
          outlineColor: vars.colors.gray8,
        },
      },

      danger: {
        borderColor: vars.colors.red7,
        backgroundColor: vars.colors.red3,
        ":hover": {
          backgroundColor: vars.colors.red5,
          borderColor: vars.colors.red8,
        },
        ":focus": {
          outline: `2px dotted ${vars.colors.red7}`,
          backgroundColor: vars.colors.red5,
        },
      },
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
