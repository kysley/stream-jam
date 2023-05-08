import { forwardRef } from "react";
import { button, ButtonVariants } from "./button.css";

export type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> &
	ButtonVariants;
export const Button = forwardRef<
	HTMLButtonElement,
	ButtonProps & { href?: string }
>(function Button({ intent, name, children, pill, ghost, href, ...rest }, ref) {
	const cN = button({
		intent,
		pill,
		ghost,
	}); // ugly

	return (
		<div style={{ minWidth: 0 }}>
			{href ? (
				<a href={href} ref={ref} {...rest}>
					<span className={cN}>{children}</span>
				</a>
			) : (
				<button ref={ref} {...rest} className={cN}>
					{children}
				</button>
			)}
		</div>
	);
});
