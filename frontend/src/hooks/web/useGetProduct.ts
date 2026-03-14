import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../../api/api"

export const useGetProduct = (id?: string) => {
  const response = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: Boolean(id),
  })

  return response
}
