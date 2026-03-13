import { useAuth } from "@clerk/react"
import { useEffect } from "react"
import AuthStore from "../api/authStore"
import { useUserSync } from "../hooks/web/useUserSync"

export const AuthSync: React.FC = () => {
  const { isSignedIn, getToken, isLoaded } = useAuth()

  useUserSync()

  useEffect(() => {
    const updateAuth = async () => {
      if (isLoaded) {
        if (isSignedIn) {
          const token = await getToken()
          AuthStore.setAuth(token, true)
        } else {
          AuthStore.setAuth(null, false)
        }
      }
    }

    updateAuth()
  }, [isSignedIn, getToken, isLoaded])

  return null // This component doesn't render anything
}
