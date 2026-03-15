export interface User {
  id: string
  email: string
  name: string | null
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  createdAt: string
  userId: string
  content: string
  productId: string
  users?: User
}

export interface Product {
  id: string
  imageUrl: string
  createdAt: string
  updatedAt: string
  title: string
  description: string
  userId: string
  users?: User
  comments?: Comment[]
}

export type NewUser = Pick<User, "id" | "email"> &
  Partial<Pick<User, "name" | "imageUrl" | "createdAt" | "updatedAt">>

export type NewComment = Omit<Comment, "id" | "createdAt"> &
  Partial<Pick<Comment, "createdAt" | "id">>

export type NewProduct = Omit<Product, "id" | "createdAt" | "updatedAt"> &
  Partial<Pick<Product, "id" | "createdAt" | "updatedAt">>
