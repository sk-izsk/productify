import { relations } from "drizzle-orm"
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: text("id").primaryKey(), // clerk id
  email: text("email").notNull().unique(),
  name: text("name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("create_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("create_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
})

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("create_at", { mode: "date" }).notNull().defaultNow(),
})

// 🔴 Relations define how tables connect to each other. This enables Drizzle's query API
// 🔴 to automatically join related data when using `with: { relationName: true }`

// 🔴 Users Relations: A user can have many products and many comments
// 🔴 `many()` means one user can have multiple related records

export const usersRelations = relations(users, ({ many }) => {
  return {
    products: many(products), // A user can have multiple products
    comments: many(comments), // a user can have multiple comments
  }
})

export const productRelations = relations(products, ({ many, one }) => {
  return {
    comments: many(comments), // A product can have multiple comments
    // field = the foreign key column in this table
    // reference = the primary key column in the related table
    users: one(users, {
      fields: [products.userId],
      references: [users.id],
    }), // A product can have only one user
  }
})

export const commentsRelations = relations(comments, ({ one }) => {
  return {
    users: one(users, {
      fields: [comments.userId],
      references: [users.id],
    }),
    products: one(products, {
      fields: [comments.productId],
      references: [products.id],
    }),
  }
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Comments = typeof comments.$inferSelect
export type NewComments = typeof comments.$inferInsert
export type Products = typeof products.$inferSelect
export type NewProducts = typeof products.$inferInsert
