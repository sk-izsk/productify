import { useUser } from "@clerk/react"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { syncUser } from "../../api/api"
import { useAuthContext } from "../../contexts/authContext"

export const useUserSync = () => {
  const { isAuthenticated, isLoading } = useAuthContext()
  const { user } = useUser()

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
    if (!isAuthenticated || !user || isLoading || isPending || isSuccess) {
      return
    }

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
  }, [isAuthenticated, user, isLoading, isPending, isSuccess, mutate])

  return { isPending, isSuccess, isError }
}
