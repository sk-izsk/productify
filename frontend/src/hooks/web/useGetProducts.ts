import { useInfiniteQuery } from "@tanstack/react-query"
import { getAllProducts } from "../../api/api"

const PAGE_SIZE = 50

export const useGetProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam }) => {
      // pageParam is the cursor object or undefined
      return getAllProducts(PAGE_SIZE, pageParam)
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.nextCursor) {
        try {
          return JSON.parse(lastPage.nextCursor)
        } catch {
          return undefined
        }
      }
      return undefined
    },
    initialPageParam: undefined,
    select: (data) => data,
  })
}
