import { ReactNode } from "react";
import { Label } from "../label";
import { button, ButtonVariants } from "./button.css";

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonVariants & {
    icon?: ReactNode;
  };
export function Button({ intent, icon, name, children, ...rest }: ButtonProps) {
  const cN = button({ intent, type: icon ? "icon" : undefined }); // ugly

  return (
    <div style={{ minWidth: 0 }}>
      <button className={cN} {...rest}>
        {icon && icon}
        {children}
      </button>
    </div>
  );
}
