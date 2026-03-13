import { useAuth } from "@clerk/react"
import { useEffect } from "react"
import AuthStore from "../api/authStore"

export const AuthSync: React.FC = () => {
  const { isSignedIn, getToken, isLoaded } = useAuth()

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
