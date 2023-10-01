import { ReactNode } from "react";
import { useMagnets } from "../../hooks/use-magnets";
import { useMagnetActions } from "../../state";
import { Button } from "../ui/button";
import { Popover } from "../popover/popover";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function MagnetPresetSheet({ target }: { target: ReactNode }) {
	const { data, isLoading } = useMagnets();
	const { addMagnet } = useMagnetActions();

	if (isLoading) {
		return <span>loading...</span>;
	}
	return (
		<Sheet>
			<SheetTrigger asChild>{target}</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you're done.
					</SheetDescription>
				</SheetHeader>

				<div
					style={{
						display: "grid",
						gridAutoFlow: "dense",
						gap: "1em",
						gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
					}}
				>
					{data?.map(
						({ id, name, props }) =>
							props?.type === "media" && (
								<Button
									key={id}
									variant="ghost"
									style={{ height: "auto" }}
									onClick={() =>
										addMagnet({
											id: `${id}${Date.now()}`,
											name,
											...props,
										})
									}
								>
									<img
										style={{ cursor: "pointer", maxWidth: 150 }}
										src={props.url || ""}
										alt={name}
									/>
								</Button>
							),
					)}
				</div>
				{/* <SheetFooter>
					<SheetClose asChild>
						<Button type="submit">Save changes</Button>
					</SheetClose>
				</SheetFooter> */}
			</SheetContent>
		</Sheet>
	);
}

// export function MagnetPresetsPopover({ target }: { target: ReactNode }) {
// 	const { data, isLoading } = useMagnets();
// 	const { addMagnet } = useMagnetActions();

// 	if (isLoading) {
// 		return <span>loading...</span>;
// 	}

// 	return (
// 		<Popover target={target}>
// 			<div
// 				style={{ maxWidth: "30vw", display: "flex", flexWrap: "wrap", gap: 6 }}
// 			>
// 				{data?.map(
// 					({ id, name, props }) =>
// 						props?.type === "media" && (
// 							<div key={id}>
// 								<Button
// 									ghost
// 									style={{ height: "auto" }}
// 									onClick={() =>
// 										addMagnet({
// 											id: `${id}${Date.now}`,
// 											name,
// 											...props,
// 										})
// 									}
// 								>
// 									<img
// 										style={{ cursor: "pointer", maxWidth: 150 }}
// 										src={props.url || ""}
// 										alt={name}
// 									/>
// 								</Button>
// 							</div>
// 						),
// 				)}
// 			</div>
// 		</Popover>
// 	);
// }
