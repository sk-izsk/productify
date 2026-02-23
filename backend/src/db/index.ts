import { drizzle } from "drizzle-orm/singlestore/driver"
import { Pool } from "pg"
import { ENV } from "../config/env"
import * as schema from "./schema"

if (!ENV.DATABASE_URL) {
  throw new Error("DB_URL is not set in environment variables")
}

// initialize postgres
const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
})

// log when first connection made
pool.on("connect", () => {
  console.log("Database connected successfully ✅")
})

// log when error occurs
pool.on("error", (error) => {
  console.log("Something is wrong in data base 🛑")
})

export const db = drizzle({ client: pool, schema })

// What is a Connection Pool?
// A connection pool is a cache of database connections that are kept open and reused.
// Why use it?
// Opening/closing connections is slow. Instead of creating a new connection for each request, we reuse existing ones.
// Databases limit concurrent connections. A pool manages a fixed number of connections and shares them across requests.
