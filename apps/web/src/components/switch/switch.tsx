import {
	SwitchThumb,
	Root as SwitchRoot,
	SwitchProps,
} from "@radix-ui/react-switch";
import { Label } from "../label";
import { switchRoot, switchThumb } from "./switch.css";

export function Switch({ name, ...rest }: { name: string } & SwitchProps) {
	return (
		<Label name={name}>
			<SwitchRoot className={switchRoot} {...rest}>
				<SwitchThumb className={switchThumb} />
			</SwitchRoot>
		</Label>
	);
}
