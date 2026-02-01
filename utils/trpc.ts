import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/api/root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import superjson from "superjson";

export const api = createTRPCReact<AppRouter>();

export function TRPCProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  }));

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        (runtime) => ({
          op: (op) => {
            const url = new URL(
              `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/trpc/${op.path}`,
            );
            url.searchParams.set("input", JSON.stringify(op.input));
            return fetch(url.toString())
              .then((res) => res.json())
              .then((data) => {
                return {
                  result: data,
                };
              });
          },
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
}
