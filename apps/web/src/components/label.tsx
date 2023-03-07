import { ReactNode } from "react";

export type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & { name: string; children: ReactNode };
export function Label({ name, children, ...rest }: LabelProps) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        fontWeight: "600",
        minWidth: 0,
      }}
      {...rest}
    >
      {name}
      {children}
    </label>
  );
}
