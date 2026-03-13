import { useAuth } from "@clerk/react"
import { useEffect } from "react"
import { baseApi } from "../../api/baseApi"

export const useAuthReq = () => {
  const { isSignedIn, getToken, isLoaded } = useAuth()

  useEffect(() => {
    const interceptor = baseApi.interceptors.request.use(async (config) => {
      if (isSignedIn) {
        const token = await getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    })
    return () => {
      baseApi.interceptors.request.eject(interceptor)
    }
  }, [isSignedIn, getToken])

  return { isSignedIn, isClerkLoaded: isLoaded }
}
