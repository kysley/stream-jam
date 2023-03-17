import { forwardRef, ReactNode } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { IconCheck, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import * as cls from "./select.css";

type SelectProps = {
	placeholder?: string;
	options: [{ value: string | number; name: string; extra?: ReactNode }];
};
export function Select({ placeholder, options }: SelectProps) {
	return (
		<RadixSelect.Root>
			<RadixSelect.Trigger aria-label="Food" className={cls.selectTrigger}>
				<RadixSelect.Value placeholder={placeholder} />
				<RadixSelect.Icon className={cls.selectIcon}>
					<IconChevronDown />
				</RadixSelect.Icon>
			</RadixSelect.Trigger>
			{/* <RadixSelect.Portal> */}
			<RadixSelect.Content
				className={cls.selectContent}
				position="popper"
				sideOffset={5}
			>
				<RadixSelect.ScrollUpButton>
					<IconChevronUp />
				</RadixSelect.ScrollUpButton>
				<RadixSelect.Viewport className={cls.selectViewport}>
					{options.map((o) => (
						<SelectItem value={o.value} key={o.value}>
							{o.name}
							{o.extra}
						</SelectItem>
					))}
					{/* <RadixSelect.Group> */}
					{/* <RadixSelect.Label>Jams</RadixSelect.Label> */}
					{/* <SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
					<SelectItem value="blueberry">Blueberry</SelectItem>
					<SelectItem value="grapes">Grapes</SelectItem>
					<SelectItem value="pineapple">Pineapple</SelectItem> */}
					{/* </RadixSelect.Group> */}

					<RadixSelect.Separator />
				</RadixSelect.Viewport>
				<RadixSelect.ScrollDownButton>
					<IconChevronDown />
				</RadixSelect.ScrollDownButton>
			</RadixSelect.Content>
			{/* </RadixSelect.Portal> */}
		</RadixSelect.Root>
	);
}

const SelectItem = forwardRef(({ children, ...props }, forwardedRef) => {
	return (
		<RadixSelect.Item {...props} ref={forwardedRef} className={cls.selectItem}>
			<RadixSelect.ItemText>{children}</RadixSelect.ItemText>
			<RadixSelect.ItemIndicator className={cls.styleItemIndicator}>
				<IconCheck size={18} />
			</RadixSelect.ItemIndicator>
		</RadixSelect.Item>
	);
});
