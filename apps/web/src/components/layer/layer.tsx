import { layerStyles } from "./layer.css";

type LayerProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;
export function Layer({ children, className, ...rest }: LayerProps) {
	const cls = `${layerStyles} ${className}`;

	return (
		<div {...rest} className={cls}>
			{children}
		</div>
	);
}
