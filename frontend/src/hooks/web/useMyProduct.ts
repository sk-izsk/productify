import { useInfiniteQuery } from "@tanstack/react-query"
import { getMyProducts } from "../../api/api"

const PAGE_SIZE = 50

export const useMyProducts = () => {
  return useInfiniteQuery({
    queryKey: ["myProducts"],
    queryFn: async ({ pageParam = 0 }) => {
      return getMyProducts(PAGE_SIZE, pageParam)
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) {
        return undefined
      }
      return allPages.length * PAGE_SIZE
    },
    initialPageParam: 0,
  })
}
