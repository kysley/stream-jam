import { Label } from "../label";
import { input, InputVariants } from "./input.css";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputVariants;
export function Input({ intent, name, ...rest }: InputProps) {
  const cN = input({ intent });

  if (name) {
    return (
      <Label name={name}>
        <div style={{ minWidth: 0 }}>
          <input className={cN} {...rest} />
        </div>
      </Label>
    );
  }
  return (
    <div style={{ minWidth: 0 }}>
      <input className={cN} {...rest} />
    </div>
  );
}
