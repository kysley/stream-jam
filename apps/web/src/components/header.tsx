import {
	IconBrandTwitch,
	IconDashboard,
	IconFolder,
	IconHome,
	IconLoader,
	IconSettings,
	IconUser,
} from "@tabler/icons-react";
import { Fragment } from "react";
import { Link, useRoute } from "wouter";
import { useMe } from "../hooks/use-me";
import { trpc } from "../utils/trpc";
import { Button } from "./button";
import { MagnetPresetsPopover } from "./magnet-presets/magnet-presets-popover";
import { Popover } from "./popover/popover";
import { PopoverItem, PopoverTitle } from "./popover/popover.css";
import { QuickToolbar } from "./toolbar";
import { TwitchAuthButton } from "./twitch-auth-button";

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
							<MagnetPresetsPopover
								target={
									<Button ghost intent="primary">
										Presets
										<IconFolder />
									</Button>
								}
							/>
						) : (
							<Link to='/'>
								<a>
									<Button ghost>
										Home
										<IconHome />
									</Button>
								</a>
							</Link>
						)}
						{isLoading && <IconLoader />}
						{!isLoading && data && (
							<Popover
								target={
									<Button pill ghost>
										<IconUser />
									</Button>
								}
							>
								{/* <div className={PopoverItem}>Dashboard</div> */}
								<div className={PopoverTitle}>
									<IconBrandTwitch size={20} />
									<span>{data.twDisplayName}</span>
								</div>
								<Link to="/dashboard">
									<a>
										<div className={PopoverItem}>
											<IconDashboard />
											Dashboard
										</div>
									</a>
								</Link>
								<div className={PopoverItem}>
									<IconFolder />
									Manage presets
								</div>
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
