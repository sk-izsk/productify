import { ClerkProvider } from "@clerk/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { type PropsWithChildren } from "react"
import { BrowserRouter } from "react-router"
import { AuthProvider } from "./providers/AuthProvider"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk publishable key")
}

const queryClient = new QueryClient()

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <AuthProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </AuthProvider>
      </ClerkProvider>
    </QueryClientProvider>
  )
}
