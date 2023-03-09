import { Label } from "../label";
import { button, ButtonVariants } from "./button.css";

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonVariants;
export function Button({ intent, name, children, ...rest }: ButtonProps) {
  const cN = button({ intent });

  return (
    <div style={{ minWidth: 0 }}>
      <button className={cN} {...rest}>
        {children}
      </button>
    </div>
  );
}
