import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme.css";

export const input = recipe({
  base: {
    borderRadius: vars.radii[3],
    height: "35px",
    paddingLeft: "6px",
    fontSize: "15px",
    lineHeight: "35px",
    border: "1px solid transparent",
    transition: "background-color, border-color ease-in .035s",
    width: "100%",
  },
  variants: {
    intent: {
      neutral: {
        borderColor: vars.colors.gray7,
        backgroundColor: vars.colors.gray3,
        color: vars.colors.gray12,
        ":focus": {
          outline: `dotted thin ${vars.colors.gray7}`,
          backgroundColor: vars.colors.gray5,
        },
        ":hover": {
          backgroundColor: vars.colors.gray5,
          borderColor: vars.colors.gray8,
        },
      },
      danger: {
        borderColor: vars.colors.red7,
        backgroundColor: vars.colors.red3,
        color: vars.colors.red12,
        ":hover": {
          backgroundColor: vars.colors.red5,
          borderColor: vars.colors.red8,
        },
        ":focus": {
          outline: `dotted thin ${vars.colors.red7}`,
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
