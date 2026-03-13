import type { NewUser, User } from "../types"
import { baseApi } from "./baseApi"

export const syncUser = async (userData: Partial<User> | NewUser) => {
  const response = await baseApi.post<User | NewUser>("users/sync", {
    json: userData,
  })
  return response.json()
}

export const getAllProducts = async () => {
  const response = await baseApi.get("products")
  return response.json()
}

export const getProductById = async (productId: string) => {
  const response = await baseApi.get(`products/${productId}`)
  return response.json()
}

export const getMyProducts = async () => {
  const response = await baseApi.get("products/my")
  return response.json()
}

export const createProduct = async (formData: FormData) => {
  const response = await baseApi.post("products", {
    body: formData,
  })
  return response.json()
}

export const updateProduct = async (productId: string, formData: FormData) => {
  const response = await baseApi.put(`products/${productId}`, {
    body: formData,
  })
  return response.json()
}

export const deleteProduct = async (productId: string) => {
  const response = await baseApi.delete(`products/${productId}`)
  return response.json()
}

export const createComment = async (productId: string, content: string) => {
  const response = await baseApi.post("comments", {
    json: {
      productId,
      content,
    },
  })
  return response.json()
}

export const deleteComment = async (commentId: string) => {
  const response = await baseApi.delete(`comments/${commentId}`)
  return response.json()
}
