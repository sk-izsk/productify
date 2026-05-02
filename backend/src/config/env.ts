import dotenv from "dotenv"

const isTestEnvironment = process.env.NODE_ENV === "test"

const parseFrontendUrls = (): string[] => {
  const combinedUrls = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URLS,
  ]
    .filter(Boolean)
    .flatMap((value) => value!.split(","))
    .map((value) => value.trim())
    .filter(Boolean)

  return Array.from(new Set(combinedUrls))
}

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
  FRONTEND_URLS: parseFrontendUrls(),
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
}
