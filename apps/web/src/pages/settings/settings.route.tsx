import { Layer, Stage } from "react-konva";
import { Link, useLocation, useRoute } from "wouter";
import { RemoteMagnetDisplay } from "../../components/remote-magnet-display";
import { usePathname, useSearch } from "wouter/use-location";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { EditorsSettings } from "./editors-settings";

const sidebarNavItems = [
	{
		title: "Account",
		href: "/settings",
	},
	{
		title: "Editors",
		href: "/settings?tab=editors",
	},
	{
		title: "Appearance",
		href: "/examples/forms/appearance",
	},
	{
		title: "Notifications",
		href: "/examples/forms/notifications",
	},
	{
		title: "Display",
		href: "/examples/forms/display",
	},
];
export function SettingsPage() {
	const search = useSearch();

	const params = new URLSearchParams(search);

	return (
		<div className="hidden space-y-6 p-10 pb-16 md:block">
			<div className="space-y-0.5">
				<h2 className="text-2xl font-bold tracking-tight">Settings</h2>
				<p className="text-muted-foreground">
					Manage your account settings and set e-mail preferences.
				</p>
			</div>
			<Separator className="my-6" />
			<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
				<aside className="-mx-4 lg:w-1/5">
					<SidebarNav items={sidebarNavItems} />
				</aside>
				<div className="flex-1 lg:max-w-2xl">
					{!params.size && (
						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-medium">Profile</h3>
								<p className="text-sm text-muted-foreground">
									This is how others will see you on the site.
								</p>
							</div>
							<Separator />
							{/* <ProfileForm /> */}
						</div>
					)}
					{params.get("tab") === "editors" && <EditorsSettings />}
				</div>
			</div>
		</div>
	);
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
	items: {
		href: string;
		title: string;
	}[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
	const pathname = usePathname();
	const search = useSearch();
	return (
		<nav
			className={cn(
				"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
				className,
			)}
			{...props}
		>
			{items.map((item) => (
				<Link
					key={item.href}
					href={item.href}
					className={cn(
						buttonVariants({ variant: "ghost" }),
						pathname + search === item.href
							? "bg-muted hover:bg-muted"
							: "hover:bg-transparent hover:underline",
						"justify-start",
					)}
				>
					{item.title}
				</Link>
			))}
		</nav>
	);
}
