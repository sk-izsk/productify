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
    // Add pageParam to queryKey for dependency
    select: (data) => data,
    // The queryKey will be ["products", pageParam] for each page
    // This is handled internally by react-query for infinite queries
  })
}
