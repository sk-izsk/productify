import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../../api/api"

export const useGetProducts = () => {
  const response = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  })

  return response
}
