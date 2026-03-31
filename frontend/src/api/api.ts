import type { NewUser, Product, ProductWriteInput, User } from "../types"
import { baseApi } from "./baseApi"

export const syncUser = async (userData: Partial<User> | NewUser) => {
  const response = await baseApi.post<User | NewUser>("users/sync", {
    json: userData,
  })
  return response.json()
}

export const getAllProducts = async (
  limit?: number,
  cursor?: { createdAt: string; id: string } | null,
) => {
  const searchParams: Record<string, string> = {}
  if (limit !== undefined) searchParams.limit = String(limit)
  if (cursor !== undefined && cursor !== null)
    searchParams.cursor = JSON.stringify(cursor)
  const response = await baseApi.get<{
    products: Product[]
    nextCursor: string | null
  }>("products", {
    searchParams,
  })
  return response.json()
}

export const getProductById = async (productId: string) => {
  const response = await baseApi.get<Product>(`products/${productId}`)
  return response.json()
}

export const getMyProducts = async (
  limit?: number,
  cursor?: { createdAt: string; id: string } | null,
) => {
  const searchParams: Record<string, string> = {}
  if (limit !== undefined) searchParams.limit = String(limit)
  if (cursor !== undefined && cursor !== null)
    searchParams.cursor = JSON.stringify(cursor)
  const response = await baseApi.get<{
    products: Product[]
    nextCursor: string | null
  }>("products/my", {
    searchParams,
  })
  return response.json()
}

export const createProduct = async (formData: ProductWriteInput) => {
  const response = await baseApi.post<Product>("products", {
    json: formData,
  })
  return response.json()
}

export const updateProduct = async ({
  productId,
  formData,
}: {
  productId: string
  formData: ProductWriteInput
}) => {
  const response = await baseApi.put<Product>(`products/${productId}`, {
    json: formData,
  })
  return response.json()
}

export const deleteProduct = async ({ productId }: { productId: string }) => {
  const response = await baseApi.delete(`products/${productId}`)
  return response.json()
}

export const createComment = async ({
  productId,
  content,
}: {
  productId: string
  content: string
}) => {
  const response = await baseApi.post(`comments/${productId}`, {
    json: {
      productId,
      content,
    },
  })
  return response.json()
}

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  const response = await baseApi.delete(`comments/${commentId}`)
  return response.json()
}
