import { ClerkProvider } from "@clerk/react"
import React, { type PropsWithChildren } from "react"
import { BrowserRouter } from "react-router"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk publishable key")
}

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>{children}</BrowserRouter>
      </ClerkProvider>
    </>
  )
}
