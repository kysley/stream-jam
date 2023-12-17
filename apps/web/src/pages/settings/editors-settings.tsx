import { IconRefresh } from "@tabler/icons-react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { trpc } from "../../utils/trpc";

export function EditorsSettings() {
	const { data: moderators, isLoading } = trpc.getUserModerators.useQuery();
	return (
		<div className="space-y-12">
			<div className="space-y-3">
				<div>
					<h3 className="text-xl font-medium">Sync moderators</h3>
					<Separator />
				</div>
				<p className="text-sm text-muted-foreground">
					Allow all of your moderators to interact with magnets on your overlay.
				</p>
				<Button variant="secondary">Sync moderators</Button>
			</div>
			<div className="space-y-3">
				<div>
					<h3 className="text-xl font-medium">Manage editors</h3>
					<Separator />
				</div>
				<p className="text-sm text-muted-foreground">
					Editors are users who have the ability to modify your overlay.
				</p>
				<div>
					{isLoading || !moderators ? (
						"loading..."
					) : (
						<ul>
							{moderators.map((m) => (
								<li key={m.user_id}>{m.user_name}</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}

// function Editor
