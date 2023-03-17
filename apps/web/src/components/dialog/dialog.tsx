import * as RadixDialog from "@radix-ui/react-dialog";
import { IconCross } from "@tabler/icons-react";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import * as cls from "./dialog.css";

export function Dialog() {
	return (
		<RadixDialog.Root defaultOpen>
			{/* <RadixDialog.Portal> */}
			<RadixDialog.Overlay className={cls.DialogOverlay} />
			<RadixDialog.Content className={cls.DialogContent}>
				<RadixDialog.Title className={cls.DialogTitle}>
					Edit profile
				</RadixDialog.Title>
				<RadixDialog.Description className={cls.DialogDescription}>
					Make changes to your profile here. Click save when you're done.
				</RadixDialog.Description>
				<Label name="name">Name</Label>
				<Input id="name" defaultValue="Pedro Duarte" />
				<Label name="username">Username</Label>
				<Input id="username" defaultValue="@peduarte" />
				<div style={{ marginTop: 25, justifyContent: "flex-end" }}>
					<RadixDialog.Close asChild>
						<Button intent="primary">Save changes</Button>
					</RadixDialog.Close>
				</div>
				<RadixDialog.Close asChild>
					<Button icon={<IconCross />} />
				</RadixDialog.Close>
			</RadixDialog.Content>
			{/* </RadixDialog.Portal> */}
		</RadixDialog.Root>
	);
}
