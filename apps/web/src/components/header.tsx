import { IconLoader, IconUser } from "@tabler/icons-react";
import { Fragment } from "react";
import { useMe } from "../hooks/use-me";
import { trpc } from "../utils/trpc";
import { Button } from "./button";
import { QuickToolbar } from "./toolbar";
import { toolbarContainer } from "./toolbar.css";
import { TwitchAuthButton } from "./twitch-auth-button";

export function Header() {
	const { data, isLoading } = useMe();
	const { data: notifs } = trpc.notifications.useQuery();
	const { data: jams } = trpc.jammingWith.useQuery();

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
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						position: "relative",
					}}
				>
					<QuickToolbar jams={jams} me={data} />
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
						<Button ghost intent="primary">
							Presets
						</Button>
						{isLoading && <IconLoader />}
						{!isLoading && data && (
							<Button pill>
								{data.twDisplayName}
								{/* <IconUser /> */}
							</Button>
						)}
						{!(isLoading || data) && <TwitchAuthButton />}
					</div>
				</div>
			</div>
		</Fragment>
	);
}
