import Skeleton from "react-loading-skeleton";
import { Link } from "wouter";
import {
	Page,
	PageTitle,
	DashboardGrid,
	DashboardSection,
	DashboardTitle,
	Stat,
	StatText,
	StatValue,
	DashboardImage,
} from "../components/start/start-page.css";
import { useMe } from "../hooks/use-me";

export function DashboardPage() {
	const { data } = useMe();

	return (
		<div className={Page}>
			<h1 className={PageTitle}>{data?.twDisplayName || <Skeleton />}</h1>

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
					<div style={{ display: "flex", gap: 16 }}>
						{[
							{ id: 1, url: "https://i.imgur.com/frFzz7e.gif" },
							{ id: 2, url: "https://i.imgur.com/frFzz7e.gif" },
						].map((url) => (
							<Link href={`/magnet/${url.id}`} key={url.id}>
								<a>
									<img src={url.url} className={DashboardImage} alt={url.url} />
								</a>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
