import { Link } from "wouter";
import { MagnetList } from "../components/magnet-list";
import {
	Page,
	PageTitle,
	DashboardGrid,
	DashboardSection,
	DashboardTitle,
	Stat,
	StatText,
	StatValue,
} from "./start/start-page.css";
import { useMe } from "../hooks/use-me";
import { trpc } from "../utils/trpc";

export function DashboardPage() {
	const { data } = useMe();
	const { data: magnets } = trpc.magnets.useQuery();

	return (
		<div className={Page}>
			<h1 className={PageTitle}>{data?.twDisplayName || "loading"}</h1>

			<div className={DashboardGrid}>
				<div className={DashboardSection}>
					<h2 className={DashboardTitle}>Stats</h2>
					<div style={{ display: "flex", gap: 16 }}>
						<div className={Stat}>
							<h3 className={StatText}>pixels dragged</h3>
							<span className={StatValue}>14k</span>
						</div>
						<div className={Stat}>
							<h3 className={StatText}>magnets added</h3>
							<span className={StatValue}>38</span>
						</div>
						<div className={Stat}>
							<h3 className={StatText}>magnets saved</h3>
							<span className={StatValue}>5</span>
						</div>
					</div>
				</div>
				<div className={DashboardSection}>
					<h2 className={DashboardTitle}>Presets</h2>
					<MagnetList />
				</div>
			</div>
		</div>
	);
}
