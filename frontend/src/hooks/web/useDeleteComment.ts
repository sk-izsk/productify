import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment } from "../../api/api"

export const useDeleteComment = (productId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", productId],
      })
    },
  })
}
