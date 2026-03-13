import type { NewUser, User } from "../types"
import { baseApi } from "./baseApi"

export const syncUser = async (userData: Partial<User> | NewUser) => {
  const response = await baseApi.post<User | NewUser>("/users/sync", userData)
  return response.data
}

export const getAllProducts = async () => {
  const response = await baseApi.get("/products")
  return response.data
}

export const getProductById = async (productId: string) => {
  const response = await baseApi.get(`/products/${productId}`)
  return response.data
}

export const getMyProducts = async () => {
  const response = await baseApi.get("/products/my")
  return response.data
}

export const createProduct = async (formData: FormData) => {
  const response = await baseApi.post("/products", formData)
  return response.data
}

export const updateProduct = async (productId: string, formData: FormData) => {
  const response = await baseApi.put(`/products/${productId}`, formData)
  return response.data
}

export const deleteProduct = async (productId: string) => {
  const response = await baseApi.delete(`/products/${productId}`)
  return response.data
}

export const createComment = async (productId: string, content: string) => {
  const response = await baseApi.post("/comments", {
    productId,
    content,
  })
  return response.data
}

export const deleteComment = async (commentId: string) => {
  const response = await baseApi.delete(`/comments/${commentId}`)
  return response.data
}
