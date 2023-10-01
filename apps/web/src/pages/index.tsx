import { StatefulMagnetEditor } from "../components/magnet-editor";
import { trpc } from "../utils/trpc";
import { StageComponent } from "../components/stage";
import { Button } from "../components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";

export function IndexPage() {
	const { data } = trpc.me.useQuery();
	const { data: overlay, isLoading: overlayLoading } =
		trpc.getUserOverlay.useQuery();

	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<StatefulMagnetEditor emit />
			<div className="flex w-full h-full items-center justify-center gap-20">
				{overlayLoading ? (
					<Button disabled>
						<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
					</Button>
				) : !overlayLoading && overlay ? (
					<span>you have an overlay</span>
				) : (
					<div className="flex gap-2 flex-col">
						<h1>As a streamer</h1>
						<p>
							Create an overlay to start using Stream Jam's real-time magnet
							board, <br />
							sub+follow alerts, and more.
						</p>
						<Button onClick={() => setModalOpen(true)} variant="secondary">
							Create overlay
						</Button>
					</div>
				)}
				<Separator className="h-10" orientation="vertical" />
				<div className="flex gap-2 flex-col">
					<h1>As a viewer or moderator</h1>
					<p>
						Search for streamers who have made you an editor <br /> or request
						access from a stream you moderate.
					</p>
				</div>
			</div>
			<Dialog open={modalOpen} onOpenChange={(o) => setModalOpen(o)}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input id="name" value="Pedro Duarte" className="col-span-3" />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="username" className="text-right">
								Username
							</Label>
							<Input id="username" value="@peduarte" className="col-span-3" />
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
