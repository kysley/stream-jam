import * as RadixPopover from "@radix-ui/react-popover";
import { ReactNode } from "react";
import * as cls from "./popover.css";

type PopoverProps = {
	target: ReactNode;
	children: ReactNode;
} & RadixPopover.PopoverProps;

export function Popover({ children, target }: PopoverProps) {
	return (
		<RadixPopover.Root>
			<RadixPopover.Trigger asChild>{target}</RadixPopover.Trigger>
			<RadixPopover.Content
				className={cls.PopoverContent}
				sideOffset={5}
				collisionPadding={{ right: 24 }}
			>
				{children}
			</RadixPopover.Content>
		</RadixPopover.Root>
	);
}
