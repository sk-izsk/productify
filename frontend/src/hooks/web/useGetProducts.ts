import { useInfiniteQuery } from "@tanstack/react-query"
import { getAllProducts } from "../../api/api"

const PAGE_SIZE = 50

export const useGetProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 0 }) => {
      return getAllProducts(PAGE_SIZE, pageParam)
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined
      return allPages.length * PAGE_SIZE
    },
    initialPageParam: 0,
  })
}
