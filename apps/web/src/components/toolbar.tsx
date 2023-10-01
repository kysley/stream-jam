import * as Toolbar from "@radix-ui/react-toolbar";
import { ReactNode, useState } from "react";
import {
	IconPhotoPlus,
	IconAlphabetLatin,
	IconAppWindowFilled,
} from "@tabler/icons-react";
import { useMagnetActions, useStageActions } from "../state";

import * as cls from "./toolbar.css";
import { PopoverProps } from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
	Command,
	CommandInput,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from "./ui/command";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

const toolbarWidgets: { value: string; icon: ReactNode }[] = [
	{ value: "photo", icon: <IconPhotoPlus /> },
	{ value: "text", icon: <IconAlphabetLatin /> },
	{ value: "iframe", icon: <IconAppWindowFilled /> },
];

export function QuickToolbar({ jams, me }: { jams?: unknown[]; me: unknown }) {
	const { addMagnet } = useMagnetActions();
	const { toggleIFrameFocus } = useStageActions();

	return (
		<div className={cls.toolbarContainer}>
			<Button
				variant="outline"
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

			<Button
				variant="outline"
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

			<Button variant="outline" onClick={() => toggleIFrameFocus()}>
				<IconAppWindowFilled size={28} />
			</Button>

			<StreamSelector streams={[{ id: "1", name: "swan_one" }]} />

			{/* {jams && jams.length > 0 && (
				// <Select
				// 	placeholder="Connect to a stream"
				// 	options={[
				// 		{ name: "home (you)", value: "" },
				// 		...jams.map((j) => ({ name: j.name, value: j.id })),
				// 		{ name: "moonmoon", value: "moonmoon" },
				// 	]}
				// />
			)} */}
		</div>
	);
}

interface StreamSelectorProps extends PopoverProps {
	streams: any[];
}

export function StreamSelector({ streams, ...props }: StreamSelectorProps) {
	const [open, setOpen] = useState(false);
	const [selectedPreset, setSelectedPreset] = useState();
	// const router = useRouter()

	return (
		<Popover open={open} onOpenChange={setOpen} {...props}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-label="Streams..."
					aria-expanded={open}
					className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
				>
					{selectedPreset ? selectedPreset.name : "Streams..."}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-0">
				<Command>
					<CommandInput placeholder="Search streams..." />
					<CommandEmpty>No streams online.</CommandEmpty>
					<CommandGroup heading="Online">
						{streams.map((preset) => (
							<CommandItem
								key={preset.id}
								onSelect={() => {
									setSelectedPreset(preset);
									setOpen(false);
								}}
							>
								{preset.name}
								<CheckIcon
									className={cn(
										"ml-auto h-4 w-4",
										selectedPreset?.id === preset.id
											? "opacity-100"
											: "opacity-0",
									)}
								/>
							</CommandItem>
						))}
					</CommandGroup>
					{/* <CommandGroup className="pt-0">
						<CommandItem>More examples</CommandItem>
					</CommandGroup> */}
				</Command>
			</PopoverContent>
		</Popover>
	);
}
