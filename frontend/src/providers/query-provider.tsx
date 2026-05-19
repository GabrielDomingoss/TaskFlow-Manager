"use client";

import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface IQueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: IQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
