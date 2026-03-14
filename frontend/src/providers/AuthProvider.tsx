import { useAuth } from "@clerk/react"
import React, { useEffect, useState } from "react"
import { setAuthToken } from "../api/baseApi"
import { AuthContext, type AuthContextType } from "../contexts/authContext"

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isSignedIn, getToken, isLoaded } = useAuth()
  const [authState, setAuthState] = useState<AuthContextType>({
    token: null,
    isAuthenticated: false,
    isLoading: true,
  })

  // Update auth state when Clerk state changes
  useEffect(() => {
    const updateAuth = async () => {
      if (isLoaded) {
        if (isSignedIn) {
          try {
            const token = await getToken()
            setAuthState({
              token,
              isAuthenticated: true,
              isLoading: false,
            })
            // Update global auth token for ky
            setAuthToken(token)
          } catch (error) {
            console.error("Failed to get token:", error)
            setAuthState({
              token: null,
              isAuthenticated: false,
              isLoading: false,
            })
            setAuthToken(null)
          }
        } else {
          setAuthState({
            token: null,
            isAuthenticated: false,
            isLoading: false,
          })
          setAuthToken(null)
        }
      }
    }

    updateAuth()
  }, [isSignedIn, getToken, isLoaded])

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  )
}
