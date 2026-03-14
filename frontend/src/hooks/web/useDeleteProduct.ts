import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from "../../api/api"

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myProducts"],
      })
    },
  })
}
