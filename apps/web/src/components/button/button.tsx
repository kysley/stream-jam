import { ReactNode, forwardRef } from "react";
import { Label } from "../label";
import { button, ButtonVariants } from "./button.css";

export type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> &
	ButtonVariants;
export const Button = forwardRef<any, ButtonProps>(function Button(
	{ intent, name, children, pill, ghost, ...rest },
	ref,
) {
	const cN = button({
		intent,
		pill,
		ghost,
	}); // ugly

	return (
		<div style={{ minWidth: 0 }}>
			<button className={cN} ref={ref} {...rest}>
				{children}
			</button>
		</div>
	);
});
