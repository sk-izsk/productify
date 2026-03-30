import type { NewUser, Product, ProductWriteInput, User } from "../types"
import { baseApi } from "./baseApi"

export const syncUser = async (userData: Partial<User> | NewUser) => {
  const response = await baseApi.post<User | NewUser>("users/sync", {
    json: userData,
  })
  return response.json()
}

export const getAllProducts = async (limit?: number, offset?: number) => {
  const DEFAULT_LIMIT = 50;
  const searchParams: Record<string, string> = {};
  searchParams.limit = String(limit ?? DEFAULT_LIMIT);
  if (offset !== undefined) searchParams.offset = String(offset);
  const response = await baseApi.get<Product[]>("products", {
    searchParams,
  });
  return response.json();
}

export const getProductById = async (productId: string) => {
  const response = await baseApi.get<Product>(`products/${productId}`)
  return response.json()
}

export const getMyProducts = async (limit?: number, offset?: number) => {
  const DEFAULT_LIMIT = 50;
  const searchParams: Record<string, string> = {};
  searchParams.limit = String(limit ?? DEFAULT_LIMIT);
  if (offset !== undefined) searchParams.offset = String(offset);
  const response = await baseApi.get<Product[]>("products/my", {
    searchParams,
  });
  const data = await response.json<Product[] | { error?: string }>();
  return Array.isArray(data) ? data : [];
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
