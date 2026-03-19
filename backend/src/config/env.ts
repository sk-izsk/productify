import dotenv from "dotenv"

const isTestEnvironment = process.env.NODE_ENV === "test"

if (isTestEnvironment) {
  dotenv.config({
    path: ".env.test",
    quiet: true,
  })
}

dotenv.config({
  path: ".env",
  quiet: true,
})

export const ENV = {
  PORT: process.env.PORT,
  DATABASE_URL: isTestEnvironment
    ? process.env.DATABASE_URL_TEST ?? process.env.DATABASE_URL
    : process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  FRONTEND_URL: process.env.FRONTEND_URL,
}
