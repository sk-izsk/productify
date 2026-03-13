import { useAuth, useUser } from "@clerk/react"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { syncUser } from "../../api/api"

export const useUserSync = () => {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  console.log("user: ", user)

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: syncUser,
    onError: (error) => {
      console.error("Failed to sync user:", error)
    },
    onSuccess: (data) => {
      console.log("User synced successfully:", data)
    },
  })

  useEffect(() => {
    if (!isSignedIn || !user || isPending || isSuccess) {
      return
    }

    // Wait a bit for AuthStore to be populated
    const timer = setTimeout(() => {
      const email = user?.primaryEmailAddress?.emailAddress
      if (!email) {
        console.warn("User email not available for sync")
        return
      }

      mutate({
        email,
        name: user.fullName || user.firstName || "",
        imageUrl: user.imageUrl || "",
      })
    }, 100) // 100ms delay

    return () => clearTimeout(timer)
  }, [isSignedIn, user, isPending, isSuccess, mutate])

  return { isPending, isSuccess, isError }
}
