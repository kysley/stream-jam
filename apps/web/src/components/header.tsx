import { IconLoader, IconUser } from "@tabler/icons-react";
import { useMe } from "../hooks/use-me";
import { trpc } from "../utils/trpc";
import { QuickToolbar } from "./toolbar";
import { TwitchAuthButton } from "./twitch-auth-button";

export function Header() {
	const { data, isLoading } = useMe();
	const { data: notifs } = trpc.notifications.useQuery();
	const { data: jams } = trpc.jammingWith.useQuery();

	return (
		<div
			style={{
				position: "absolute",
				width: "100%",
				display: "grid",
				gridTemplateColumns: "1fr 1fr 1fr",
				padding: "0 24px",
				top: 16,
				pointerEvents: "none",
			}}
		>
			<div style={{ gridColumn: 2, display: "flex", justifyContent: "center" }}>
				<QuickToolbar jams={jams} />
			</div>
			<div
				style={{ gridColumn: 3, display: "flex", justifyContent: "flex-end" }}
			>
				<div className="toolbar-container">
					{isLoading && <IconLoader />}
					{!isLoading && data && <IconUser />}
					{!(isLoading || data) && <TwitchAuthButton />}
				</div>
			</div>
		</div>
	);
}
