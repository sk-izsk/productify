import { eq } from "drizzle-orm"
import { db } from "./index"
import {
    comments,
    type NewComments,
    type NewProducts,
    type NewUser,
    products,
    users,
} from "./schema"

// USER QUERIES
export const createUser = async (data: NewUser) => {
  const [user] = await db.insert(users).values(data).returning()
  return user
}

// Get user by id

export const getUserById = async (id: string) => {
  return db.query.users.findFirst({ where: eq(users.id, id) })
}

// Update existing user

export const updateUser = async (
  id: string,
  data: Partial<Omit<NewUser, "id">>,
) => {
  const existingUser = await getUserById(id)
  if (!existingUser) {
    throw new Error(`user doesnt exist with id ${id}`)
  }
  const [user] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning()
  return user
}

export const upsertUser = async (data: NewUser) => {
  const { id, ...update } = data

  const [user] = await db
    .insert(users)
    .values(data)
    .onConflictDoUpdate({
      target: users.id,
      set: update,
    })
    .returning()

  return user
}

// Product Queries

export const createProduct = async (data: NewProducts) => {
  const [product] = await db.insert(products).values(data).returning()

  return product
}

export const getProductById = async (id: string) => {
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      users: true,
      comments: {
        with: { users: true },
        orderBy: (comments, { desc }) => {
          return [desc(comments.createdAt)]
        },
      },
    },
  })
}


export const getAllProducts = async (limit?: number, offset?: number) => {
  return db.query.products.findMany({
    with: { users: true },
    orderBy: (products, { desc }) => {
      return [desc(products.createdAt)]
    },
    ...(limit !== undefined ? { limit } : {}),
    ...(offset !== undefined ? { offset } : {}),
  })
}

export const getProductsByUserId = async (id: string, limit?: number, offset?: number) => {
  const listOfUserProduct = await db.query.products.findMany({
    where: eq(products.userId, id),
    with: {
      users: true,
    },
    orderBy: (products, { desc }) => {
      return [desc(products.createdAt)]
    },
    ...(limit !== undefined ? { limit } : {}),
    ...(offset !== undefined ? { offset } : {}),
  })

  return listOfUserProduct
}

export const updateProduct = async (
  id: string,
  data: Partial<Omit<NewProducts, "id">>,
) => {
  const existingProduct = await getProductById(id)
  if (!existingProduct) {
    throw new Error(`product doesnt exist with id ${id}`)
  }
  const [product] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning()

  return product
}

export const deleteProduct = async (id: string) => {
  const existingProduct = await getProductById(id)
  if (!existingProduct) {
    throw new Error(`product doesnt exist with id ${id}`)
  }
  const [product] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning()

  return product
}

// comment queries

export const createComment = async (data: NewComments) => {
  const [comment] = await db.insert(comments).values(data).returning()

  return comment
}

export const deleteComment = async (id: string) => {
  const existingComment = await getCommentById(id)
  if (!existingComment) {
    throw new Error(`comment doesnt exist with id ${id}`)
  }
  const [comment] = await db
    .delete(comments)
    .where(eq(comments.id, id))
    .returning()

  return comment
}

export const getCommentById = async (id: string) => {
  const comment = await db.query.comments.findFirst({
    with: {
      users: true,
    },
    where: eq(comments.id, id),
  })

  return comment
}

export const getCommentsByUser = async (userId: string) => {
  const listOfCommentsByUser = await db.query.comments.findMany({
    with: { users: true },
    where: eq(comments.userId, userId),
    orderBy: (comments, { desc }) => {
      return [desc(comments.createdAt)]
    },
  })

  return listOfCommentsByUser
}
