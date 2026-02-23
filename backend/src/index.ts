import { clerkMiddleware } from "@clerk/express"
import cors from "cors"
import express from "express"
import { ENV } from "./config/env"

const app = express()
app.use(
  cors({
    origin: ENV.FRONTEND_URL,
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

app.listen(port, () => {
  console.log("APP is listening", port)
})
