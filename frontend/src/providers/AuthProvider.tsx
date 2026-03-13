import { useAuth } from "@clerk/react"
import React, { useEffect, useState } from "react"
import { baseApi } from "../api/baseApi"
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
          } catch (error) {
            console.error("Failed to get token:", error)
            setAuthState({
              token: null,
              isAuthenticated: false,
              isLoading: false,
            })
          }
        } else {
          setAuthState({
            token: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      }
    }

    updateAuth()
  }, [isSignedIn, getToken, isLoaded])

  // Set up axios interceptor with current auth state
  useEffect(() => {
    const interceptor = baseApi.interceptors.request.use(
      (config) => {
        if (authState.token) {
          config.headers.Authorization = `Bearer ${authState.token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    // Cleanup interceptor on unmount or auth state change
    return () => {
      baseApi.interceptors.request.eject(interceptor)
    }
  }, [authState.token])

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  )
}
