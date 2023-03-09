import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme.css";

export const input = recipe({
  base: {
    borderRadius: vars.radii[3],
    height: "32px",
    paddingLeft: "6px",
    fontSize: "15px",
    lineHeight: "32px",
    border: `1px solid transparent`,
    transition: "background-color, border-color ease-in .035s",
    width: "100%",
    backgroundColor: vars.colors.gray3,
    ":focus": {
      outline: `1px dashed ${vars.colors.gray7}`,
      backgroundColor: vars.colors.gray5,
    },
    ":hover": {
      backgroundColor: vars.colors.gray5,
      borderColor: vars.colors.gray8,
    },
  },
  variants: {
    intent: {
      neutral: {
        borderColor: vars.colors.gray7,
        backgroundColor: vars.colors.gray3,
      },
      danger: {
        borderColor: vars.colors.red7,
        backgroundColor: vars.colors.red3,
        ":hover": {
          backgroundColor: vars.colors.red5,
          borderColor: vars.colors.red8,
        },
        ":focus": {
          outline: `1px dashed ${vars.colors.red7}`,
          backgroundColor: vars.colors.red5,
        },
      },
    },
  },
  defaultVariants: {
    intent: "neutral",
  },
});

export type InputVariants = RecipeVariants<typeof input>;
