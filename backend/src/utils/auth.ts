import { getAuth } from "@clerk/express"
import type { Request, Response } from "express"

export const requireUserId = (
  request: Request,
  response: Response,
): string | null => {
  const { userId } = getAuth(request)

  if (!userId) {
    response.status(401).json({
      error: "Unauthorized access. Please log in to access this resource.",
    })
    return null
  }

  return userId
}
