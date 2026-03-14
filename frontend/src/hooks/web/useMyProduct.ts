import { useQuery } from "@tanstack/react-query"
import { getMyProducts } from "../../api/api"

export const useMyProducts = () => {
  return useQuery({ queryKey: ["myProducts"], queryFn: getMyProducts })
}
