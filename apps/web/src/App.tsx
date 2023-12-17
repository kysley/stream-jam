import { useState } from "react";
import { Route } from "wouter";
import { IndexPage } from "./pages";
import "./App.css";
import { SourceIdPage } from "./pages/source/[id]";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { ConnectedPage } from "./pages/connected";
import { themeClass } from "./theme.css";
import { DashboardPage } from "./pages/dashboard";
import { Header } from "./components/header";
import { MagnetsPage } from "./pages/magnets/magnets.route";
import { ThemeProvider } from "./components/theme-provider";
import { SettingsPage } from "./pages/settings/settings.route";
import { JamIdPage } from "./pages/jam/[id]";

function App() {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: "http://localhost:3000/trpc",
					fetch(url, options) {
						return fetch(url, {
							...options,
							credentials: "include",
						});
					},
				}),
			],
		}),
	);
	return (
		<ThemeProvider>
			<trpc.Provider client={trpcClient} queryClient={queryClient}>
				<QueryClientProvider client={queryClient}>
					<div className={`App ${themeClass}`}>
						<Header />
						{/* <div className="pos-left">hello left</div> */}
						<Route path="/" component={IndexPage} />
						<Route path="/dashboard" component={DashboardPage} />
						<Route path="/source/:id" component={SourceIdPage} />
						<Route path="/jam/:id" component={JamIdPage} />
						<Route path="/connected" component={ConnectedPage} />
						<Route path="/magnets" component={MagnetsPage} />
						<Route path="/settings" component={SettingsPage} />
					</div>
				</QueryClientProvider>
			</trpc.Provider>
		</ThemeProvider>
	);
}

export default App;
