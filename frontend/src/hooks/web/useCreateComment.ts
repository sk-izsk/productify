import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createComment } from "../../api/api"

export const useCreateComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["createComment"],
    mutationFn: createComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["product", variables.productId],
      })
    },
  })
}
