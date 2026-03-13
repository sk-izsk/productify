import { useAuth, useUser } from "@clerk/react"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { syncUser } from "../../api/api"

export const useUserSync = () => {
  const { isSignedIn } = useAuth()
  const { user } = useUser()

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: syncUser,
  })

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess) {
      mutate({
        email: user?.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName,
        imageUrl: user.imageUrl,
      })
    }
  }, [isSignedIn, user, isPending, isSuccess, mutate])
}
