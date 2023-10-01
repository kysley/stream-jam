import { Separator } from "../../components/ui/separator";

export function EditorsSettings() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Editor settings</h3>
				<p className="text-sm text-muted-foreground">
					Manage who can access and modify your stream's overlay.
				</p>
			</div>
			<Separator />
		</div>
	);
}
