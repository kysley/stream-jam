import { IconEdit } from "@tabler/icons-react";
import { Link } from "wouter";
import { trpc } from "../utils/trpc";

export function MagnetList({
	add = false,
	edit = false,
	link = false,
}: { add?: boolean; edit?: boolean }) {
	const { data, isLoading } = trpc.magnets.useQuery();

	const parsedMagnets = data?.map((m) => ({
		...m,
		props: JSON.parse(m.props),
	}));

	if (link) {
		<Link href={`/magnet/${m.id}`} key={m.id}>
			<a>
				<img src={m.props.url} alt={m.name} />
				<div>{edit && <IconEdit />}</div>
			</a>
		</Link>;
	}

	return (
		<div style={{ display: "flex", gap: 16 }}>
			{isLoading ? (
				<span>Loading</span>
			) : (
				parsedMagnets?.map((m) => (
					<div key={m.id}>
						<img src={m.props.url} alt={m.name} />
						<div>{edit && <IconEdit />}</div>
					</div>
				))
			)}
		</div>
	);
}
