import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from "../../api/api"
import type { Product } from "../../types"

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProduct,
    onSuccess: (_, variables) => {
      queryClient.setQueryData<Product[] | undefined>(
        ["products"],
        (previousProducts) => {
          if (!previousProducts) {
            return previousProducts
          }

          return previousProducts.filter(
            (product) => product.id !== variables.productId,
          )
        },
      )

      queryClient.setQueryData<Product[] | undefined>(
        ["myProducts"],
        (previousProducts) => {
          if (!previousProducts) {
            return previousProducts
          }

          return previousProducts.filter(
            (product) => product.id !== variables.productId,
          )
        },
      )
    },
  })
}
