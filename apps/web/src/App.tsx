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
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className={`App ${themeClass}`}>
          <Route path="/" component={IndexPage} />
          <Route path="/source/:id" component={SourceIdPage} />
          <Route path="/connected" component={ConnectedPage} />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
