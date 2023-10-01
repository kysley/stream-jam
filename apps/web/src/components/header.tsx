import {
	IconBrandTwitch,
	IconCircle,
	IconCircles,
	IconCircleSquare,
	IconDashboard,
	IconFold,
	IconFolder,
	IconHome,
	IconLayoutList,
	IconLoader,
	IconSettings,
	IconUser,
} from "@tabler/icons-react";
import { Fragment } from "react";
import { Link, useRoute } from "wouter";
import { useMe } from "../hooks/use-me";
import { trpc } from "../utils/trpc";
import { Button } from "./ui/button";
import { MagnetPresetSheet } from "./magnet-presets/magnet-presets-sheet";
import { Popover } from "./popover/popover";
import { PopoverItem, PopoverTitle } from "./popover/popover.css";
import { QuickToolbar } from "./toolbar";
import { TwitchAuthButton } from "./twitch-auth-button";
import Avatar from "boring-avatars";

export function Header() {
	const { data, isLoading } = useMe();
	const { data: notifs } = trpc.notifications.useQuery();
	const { data: jams } = trpc.jammingWith.useQuery();
	const [isIndex] = useRoute("/");

	return (
		<Fragment>
			<div
				style={{
					position: "absolute",
					width: "100%",
					display: "grid",
					gridTemplateColumns: "1fr",
					padding: "0 24px",
					top: 16,
					pointerEvents: "none",
					zIndex: 1000,
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						position: "relative",
					}}
				>
					{isIndex && <QuickToolbar jams={jams} me={data} />}
					<div
						style={{
							position: "absolute",
							display: "flex",
							justifyContent: "center",
							gap: 14,
							alignItems: "center",
							pointerEvents: "all",
							right: 0,
						}}
					>
						{isIndex ? (
							<MagnetPresetSheet
								target={
									<Button variant={"ghost"} className="gap-2">
										<IconFolder size={18} />
										Presets
									</Button>
								}
							/>
						) : (
							<Link to="/">
								<Button variant={"secondary"}>
									Home
									<IconHome />
								</Button>
							</Link>
						)}
						{isLoading && <IconLoader />}
						{!isLoading && data && (
							<Popover
								target={
									<Button variant={"ghost"} className="font-bold gap-2">
										<Avatar size={25} name={data.twDisplayName} />
										{data.twDisplayName}
									</Button>
								}
							>
								{/* <div className={PopoverItem}>Dashboard</div> */}
								{/* <div className={PopoverTitle}> */}
								{/* <IconBrandTwitch size={20} /> */}
								{/* <span>{data.twDisplayName}</span> */}
								{/* </div> */}
								<Link to="/dashboard">
									<a className={PopoverItem}>
										<IconDashboard />
										Dashboard
									</a>
								</Link>
								<Link to="/magnets">
									<a className={PopoverItem}>
										<IconCircleSquare />
										Magnets
									</a>
								</Link>
								<div className={PopoverItem}>
									<IconSettings />
									Settings
								</div>
							</Popover>
						)}
						{!(isLoading || data) && <TwitchAuthButton />}
					</div>
				</div>
			</div>
		</Fragment>
	);
}
