import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

const shouldRetry = ( failureCount: number, error: unknown ): boolean => {
  if ( isAxiosError( error ) ) {
    const status = error.response?.status;

    // Do not retry client errors (4xx), but retry network/server failures.
    if ( status && status >= 400 && status < 500 ) {
      return false;
    }
  }

  return failureCount < 2;
};

export const queryClient = new QueryClient( {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: shouldRetry,
    },
  },
} );
