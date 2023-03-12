import { Label } from "../label";
import { input, InputVariants } from "./input.css";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputVariants;
export function Input({ intent, name, ...rest }: InputProps) {
  const cN = input({ intent });

  return (
    <div style={{ minWidth: 0 }}>
      {name && <Label name={name}>{name}</Label>}
      <input id={name} className={cN} {...rest} />
    </div>
  );
}

export type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  InputVariants;
export function TextArea({ intent, name, ...rest }: TextAreaProps) {
  const cN = input({ intent });

  return (
    <div style={{ minWidth: 0 }}>
      {name && <Label name={name}>{name}</Label>}
      <textarea id={name} className={cN} {...rest} />
    </div>
  );
}
