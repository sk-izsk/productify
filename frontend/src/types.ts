export interface User {
  id: string
  email: string
  name: string | null
  imageUrl: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  createdAt: Date
  userId: string
  content: string
  productId: string
}

export interface Product {
  id: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  userId: string
}

export type NewUser = Pick<User, "id" | "email"> &
  Partial<Pick<User, "name" | "imageUrl" | "createdAt" | "updatedAt">>

export type NewComment = Omit<Comment, "id" | "createdAt"> &
  Partial<Pick<Comment, "createdAt" | "id">>

export type NewProduct = Omit<Product, "id" | "createdAt" | "updatedAt"> &
  Partial<Pick<Product, "id" | "createdAt" | "updatedAt">>
