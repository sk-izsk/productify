import {
    clerkMiddleware as clerkExpressMiddleware,
    requireAuth as clerkRequireAuth,
    getAuth,
} from "@clerk/express"
import type { Request, RequestHandler, Response } from "express"
import { ENV } from "../config/env"

export const TEST_USER_ID_HEADER = "x-test-user-id"

const isTestEnvironment = () => ENV.NODE_ENV === "test"

const getTestUserId = (request: Request): string | null => {
  const userId = request.header(TEST_USER_ID_HEADER)?.trim()
  return userId ? userId : null
}

export const authMiddleware: RequestHandler = (request, response, next) => {
  if (isTestEnvironment()) {
    next()
    return
  }

  const middleware = clerkExpressMiddleware()
  middleware(request, response, next)
}

export const requireAuthMiddleware = (): RequestHandler => {
  if (isTestEnvironment()) {
    return (request, response, next) => {
      if (!getTestUserId(request)) {
        response.status(401).json({
          error: "Unauthorized access. Please log in to access this resource.",
        })
        return
      }

      next()
    }
  }

  return clerkRequireAuth()
}

export const requireUserId = (
  request: Request,
  response: Response,
): string | null => {
  const userId = isTestEnvironment() ? getTestUserId(request) : getAuth(request).userId

  if (!userId) {
    response.status(401).json({
      error: "Unauthorized access. Please log in to access this resource.",
    })
    return null
  }

  return userId
}
