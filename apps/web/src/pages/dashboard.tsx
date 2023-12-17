import { Link } from "wouter";
import { MagnetList } from "../components/magnet-list";
import { useMe } from "../hooks/use-me";
import { trpc } from "../utils/trpc";

export function DashboardPage() {
	const { data } = useMe();
	const { data: magnets } = trpc.getMagnets.useQuery();

	return null;
}
