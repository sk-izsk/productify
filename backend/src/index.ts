import { clerkMiddleware } from "@clerk/express"
import cors from "cors"
import express from "express"
import { ENV } from "./config/env"
import commentRoutes from "./routes/commentRoutes"
import productRoutes from "./routes/productRoutes"
import userRoutes from "./routes/userRoutes"

const app = express()
app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
  }),
)
app.use(clerkMiddleware()) // auth will be attached to the req
app.use(express.json()) // parse JSON request bodies
app.use(
  express.urlencoded({
    extended: true,
  }),
) // parse form data like html forms

const port = ENV.PORT

// Root route
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

// app.use("/api/users", (req, res, next) => {
//   console.log("--- User Route Debug ---")
//   console.log("Headers:", req.headers)
//   console.log("Auth header:", req.headers.authorization)
//   console.log("Method:", req.method)
//   console.log("URL:", req.url)
//   console.log("Body:", req.body)
//   next()
// })

app.use("/api/users", userRoutes)

// Debug middleware for products
app.use("/api/products", (req, res, next) => {
  console.log("--- Product Route Debug ---")
  console.log("Method:", req.method)
  console.log("URL:", req.url)
  console.log("Auth header:", req.headers.authorization)
  console.log("Body:", req.body)
  next()
})

app.use("/api/products", productRoutes)
app.use("/api/comments", commentRoutes)

app.listen(port, () => {
  console.log("APP is listening", port)
})
