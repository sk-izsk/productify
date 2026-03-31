import { useInfiniteQuery } from "@tanstack/react-query"
import { getMyProducts } from "../../api/api"

const PAGE_SIZE = 50

export const useMyProducts = () => {
  return useInfiniteQuery({
    queryKey: ["myProducts"],
    queryFn: async ({ pageParam }) => {
      // pageParam is the cursor object or undefined
      return getMyProducts(PAGE_SIZE, pageParam)
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
