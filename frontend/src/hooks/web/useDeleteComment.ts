import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment } from "../../api/api"
import type { Product } from "../../types"

export const useDeleteComment = (productId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: deleteComment,
    onSuccess: (_, variables) => {
      queryClient.setQueryData<Partial<Product> | undefined>(
        ["product", productId],
        (previousProduct) => {
          if (!previousProduct?.comments) {
            return previousProduct
          }

          return {
            ...previousProduct,
            comments: previousProduct.comments.filter(
              (comment) => comment.id !== variables.commentId,
            ),
          }
        },
      )
    },
  })
}
