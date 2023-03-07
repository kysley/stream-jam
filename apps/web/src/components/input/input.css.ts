import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme.css";

export const input = recipe({
  base: {
    borderRadius: vars.radii[3],
    height: "32px",
    paddingLeft: "6px",
    fontSize: "15px",
    lineHeight: "32px",
    border: "1px solid transparent",
    transition: "all ease-in .035s",
    minWidth: "14px",
    ":focus": {
      outline: "none",
      border: `1px solid ${vars.colors.indigo9}`,
    },
  },
  variants: {
    intent: {
      neutral: {
        backgroundColor: vars.colors.gray3,
      },
    },
  },
  defaultVariants: {
    intent: "neutral",
  },
});

export type InputVariants = RecipeVariants<typeof input>;
