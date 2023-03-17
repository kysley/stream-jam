import { Fragment, ReactNode } from "react";

export type LabelProps = React.DetailedHTMLProps<
	React.LabelHTMLAttributes<HTMLLabelElement>,
	HTMLLabelElement
> & { name: string; children: ReactNode; icon?: ReactNode };
export function Label({ name, children, icon, ...rest }: LabelProps) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
				fontWeight: "600",
			}}
		>
			<label {...rest} htmlFor={name}>
				{children}
			</label>
		</div>
	);
}
