import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct } from "../../api/api"

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["createProduct"],
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}
