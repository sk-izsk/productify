import cors from "cors"
import express from "express"
import { ENV } from "./config/env"
import commentRoutes from "./routes/commentRoutes"
import productRoutes from "./routes/productRoutes"
import userRoutes from "./routes/userRoutes"
import { authMiddleware } from "./utils/auth"

export const app = express()

app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
  }),
)
app.use(authMiddleware)
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.get("/", (req, res) => {
  res.json({
    message: "Productify API is running!",
    health: "/api/health",
  })
})

app.get("/api/health", (req, res) => {
  res.json({
    message:
      "Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  })
})

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/comments", commentRoutes)