import type { NewUser, Product, User } from "../types"
import { baseApi } from "./baseApi"

export const syncUser = async (userData: Partial<User> | NewUser) => {
  const response = await baseApi.post<User | NewUser>("users/sync", {
    json: userData,
  })
  return response.json()
}

export const getAllProducts = async () => {
  const response = await baseApi.get<Partial<Product>[]>("products")
  return response.json()
}

export const getProductById = async (productId: string) => {
  const response = await baseApi.get<Partial<Product>>(`products/${productId}`)
  return response.json()
}

export const getMyProducts = async () => {
  const response = await baseApi.get<Partial<Product>[]>("products/my")
  const data = await response.json<Partial<Product>[] | { error?: string }>()
  return Array.isArray(data) ? data : []
}

export const createProduct = async (formData: Partial<Product>) => {
  const response = await baseApi.post<Partial<Product>>("products", {
    json: formData,
  })
  return response.json()
}

export const updateProduct = async ({
  productId,
  formData,
}: {
  productId: string
  formData: Partial<Product>
}) => {
  const response = await baseApi.put<Partial<Product>>(
    `products/${productId}`,
    {
      json: formData,
    },
  )
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
