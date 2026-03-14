import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProduct } from "../../api/api"

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: updateProduct,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["product", variables.productId],
      })
      queryClient.invalidateQueries({
        queryKey: ["products", variables.productId],
      })
      queryClient.invalidateQueries({
        queryKey: ["myProducts"],
      })
    },
  })
}
