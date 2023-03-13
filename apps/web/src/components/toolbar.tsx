import * as Toolbar from "@radix-ui/react-toolbar";
import { ReactNode } from "react";
import {
	IconPhotoPlus,
	IconAlphabetLatin,
	IconAppWindowFilled,
} from "@tabler/icons-react";
import { useMagnetActions, useStageActions, useStageState } from "../state";

import * as cls from "./toolbar.css";

const toolbarWidgets: { value: string; icon: ReactNode }[] = [
	{ value: "photo", icon: <IconPhotoPlus /> },
	{ value: "text", icon: <IconAlphabetLatin /> },
	{ value: "iframe", icon: <IconAppWindowFilled /> },
];

export function QuickToolbar({ jams }: { jams?: unknown[] }) {
	const { addMagnet } = useMagnetActions();
	const { toggleIFrameFocus } = useStageActions();
	const { scale } = useStageState();

	return (
		<Toolbar.Root className={cls.toolbarContainer}>
			<Toolbar.ToolbarButton
				className={cls.toolbarButton}
				onClick={() =>
					addMagnet({
						// url: "https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.webp", webp not supported atm :/
						// url: "https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.gif",
						id: crypto.randomUUID().toString(),
						url: "",
						visible: true,
						x: 50,
						y: 100,
						scale,
						type: "media",
					})
				}
			>
				<IconPhotoPlus size={28} />
			</Toolbar.ToolbarButton>
			<Toolbar.ToolbarButton className={cls.toolbarButton}>
				<IconAlphabetLatin
					size={28}
					onClick={() =>
						addMagnet({
							// url: "https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.webp", webp not supported atm :/
							// url: "https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.gif",
							id: crypto.randomUUID().toString(),
							text: "Sample Text",
							visible: true,
							x: 50,
							y: 100,
							scale: 0.6,
							type: "text",
						})
					}
				/>
			</Toolbar.ToolbarButton>
			<Toolbar.ToolbarButton
				className={cls.toolbarButton}
				onClick={() => toggleIFrameFocus()}
			>
				<IconAppWindowFilled size={28} />
			</Toolbar.ToolbarButton>
			<Toolbar.Separator style={{ background: "red", width: 2, height: 10 }} />
			{jams && (
				<select>
					{jams.map((j) => (
						<option value={j.id}>{j.name}</option>
					))}
				</select>
			)}
		</Toolbar.Root>
	);
}
