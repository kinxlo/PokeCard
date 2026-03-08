"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

import { queryClient } from "./query-client";

export function QueryProvider( { children }: { children: ReactNode } ) {
  return (
    <QueryClientProvider client={ queryClient }>
      { children }
      { process.env.NODE_ENV === "development" ? (
        <ReactQueryDevtools initialIsOpen={ false }/>
      ) : null }
    </QueryClientProvider>
  );
}

export const ReactQueryProvider = QueryProvider;
