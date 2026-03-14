import { useMutation } from "@tanstack/react-query"
import { createProduct } from "../../api/api"

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ["createProduct"],
    mutationFn: createProduct,
  })
}
