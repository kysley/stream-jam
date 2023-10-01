import * as Toolbar from "@radix-ui/react-toolbar";
import { ReactNode, useState } from "react";
import {
	IconPhotoPlus,
	IconAlphabetLatin,
	IconAppWindowFilled,
	IconDoorExit,
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
import { RouterOutputs } from "../utils/trpc";

const toolbarWidgets: { value: string; icon: ReactNode }[] = [
	{ value: "photo", icon: <IconPhotoPlus /> },
	{ value: "text", icon: <IconAlphabetLatin /> },
	{ value: "iframe", icon: <IconAppWindowFilled /> },
];

type Stream = Exclude<RouterOutputs["streams"], undefined>[number];

export function QuickToolbar({
	streams,
	me,
}: { streams: RouterOutputs["streams"]; me: unknown }) {
	const { addMagnet } = useMagnetActions();
	const { toggleIFrameFocus } = useStageActions();

	const [selectedStream, setSelectedStream] = useState<Stream>();

	return (
		<div className={cls.toolbarContainer}>
			<Button
				size="icon"
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
				size="icon"
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

			<Button variant="outline" onClick={() => toggleIFrameFocus()} size="icon">
				<IconAppWindowFilled size={28} />
			</Button>

			<StreamSelector streams={streams} />

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
	streams: RouterOutputs["streams"];
	onStreamChange?(stream?: Stream): void;
}

export function StreamSelector({
	streams,
	onStreamChange,
	...props
}: StreamSelectorProps) {
	const [open, setOpen] = useState(false);
	const [selectedStream, setSelectedStream] = useState<Stream>();
	// const router = useRouter()

	const liveStreams = streams?.filter((s) => s.live);
	const offlineStreams = streams?.filter((s) => !s.live);

	const handleChange = (stream?: Stream) => {
		setSelectedStream(stream);
		onStreamChange?.(stream);
		setOpen(false);
	};

	return (
		<div className="flex flex-column ml-5 gap-2">
			<Popover open={open} onOpenChange={setOpen} {...props}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-label="Open a stream"
						aria-expanded={open}
						className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
					>
						{selectedStream ? selectedStream.name : "Open a stream"}
						<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[300px] p-0">
					<Command>
						<CommandInput placeholder="Search streams" />
						<CommandEmpty>No streams online.</CommandEmpty>
						<CommandGroup heading="LIVE" className="text-red-500">
							{liveStreams && liveStreams.length > 0 ? (
								liveStreams.map((stream) => (
									<CommandItem
										key={stream.id}
										onSelect={() => {
											handleChange(stream);
										}}
									>
										{stream.name}
										<CheckIcon
											className={cn(
												"ml-auto h-4 w-4",
												selectedStream?.id === stream.id
													? "opacity-100"
													: "opacity-0",
											)}
										/>
									</CommandItem>
								))
							) : (
								<CommandEmpty />
							)}
						</CommandGroup>
						<CommandGroup heading="Offline">
							{offlineStreams && offlineStreams.length > 0 ? (
								offlineStreams.map((stream) => (
									<CommandItem
										key={stream.id}
										onSelect={() => {
											handleChange(stream);
										}}
									>
										{stream.name}
										<CheckIcon
											className={cn(
												"ml-auto h-4 w-4",
												selectedStream?.id === stream.id
													? "opacity-100"
													: "opacity-0",
											)}
										/>
									</CommandItem>
								))
							) : (
								<CommandEmpty />
							)}
						</CommandGroup>
						{/* <CommandGroup className="pt-0">
						<CommandItem>More examples</CommandItem>
					</CommandGroup> */}
					</Command>
				</PopoverContent>
			</Popover>
			{selectedStream && (
				<Button
					variant="secondary"
					size="icon"
					title="Leave"
					onClick={() => handleChange(undefined)}
				>
					<IconDoorExit className="text-red-500" />
				</Button>
			)}
		</div>
	);
}
