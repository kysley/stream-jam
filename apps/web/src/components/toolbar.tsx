import * as Toolbar from "@radix-ui/react-toolbar";
import { ReactNode } from "react";
import {
	IconPhotoPlus,
	IconAlphabetLatin,
	IconAppWindowFilled,
} from "@tabler/icons-react";
import { useMagnetActions, useStageActions } from "../state";

import * as cls from "./toolbar.css";
import { Select } from "./select/select";
import { Button } from "./button";

const toolbarWidgets: { value: string; icon: ReactNode }[] = [
	{ value: "photo", icon: <IconPhotoPlus /> },
	{ value: "text", icon: <IconAlphabetLatin /> },
	{ value: "iframe", icon: <IconAppWindowFilled /> },
];

export function QuickToolbar({ jams, me }: { jams?: unknown[]; me: unknown }) {
	const { addMagnet } = useMagnetActions();
	const { toggleIFrameFocus } = useStageActions();

	return (
		<Toolbar.Root className={cls.toolbarContainer}>
			<Toolbar.ToolbarButton asChild>
				<Button
					ghost
					onClick={() =>
						addMagnet({
							// url: "https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.webp", webp not supported atm :/
							// url: "https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.gif",
							id: crypto.randomUUID().toString(),
							url: "",
							visible: true,
							x: 50,
							y: 100,
							scale: 100,
							type: "media",
						})
					}
				>
					<IconPhotoPlus size={28} />
				</Button>
			</Toolbar.ToolbarButton>
			<Toolbar.ToolbarButton asChild>
				<Button
					ghost
					onClick={() => {
						addMagnet({
							// url: "https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.webp", webp not supported atm :/
							// url: "https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.gif",
							id: crypto.randomUUID().toString(),
							text: "Sample Text",
							visible: true,
							x: 50,
							y: 100,
							scale: 100,
							type: "text",
						});
					}}
				>
					<IconAlphabetLatin size={28} />
				</Button>
			</Toolbar.ToolbarButton>
			<Toolbar.ToolbarButton onClick={() => toggleIFrameFocus()} asChild>
				<Button ghost>
					<IconAppWindowFilled size={28} />
				</Button>
			</Toolbar.ToolbarButton>
			<Toolbar.Separator style={{ background: "red", width: 2, height: 10 }} />
			{jams && (
				// <select>
				// 	{jams.map((j) => (
				// 		<option value={j.id}>{j.name}</option>
				// 	))}
				// </select>
				<Select
					placeholder="Connect to a jam"
					options={[
						{ name: "home (you)", value: "" },
						...jams.map((j) => ({ name: j.name, value: j.id })),
						{ name: "moonmoon", value: "moonmoon" },
					]}
				/>
			)}
			<Toolbar.Separator style={{ background: "red", width: 2, height: 10 }} />
		</Toolbar.Root>
	);
}
