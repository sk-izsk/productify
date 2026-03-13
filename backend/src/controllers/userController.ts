import type { Request, Response } from "express"
import * as dbQueries from "../db/queries"
import { requireUserId } from "../utils/auth"

export const syncUser = async (request: Request, response: Response) => {
  try {
    console.log("response: ", response)
    console.log("request: ", request)
    const userId = requireUserId(request, response)
    if (!userId) {
      return
    }

    const { email, name, imageUrl } = request.body

    if (!email || !name || !imageUrl) {
      return response.status(400).json({
        error: "Email , name , image url is required",
      })
    }

    const user = await dbQueries.upsertUser({
      id: userId,
      email,
      name,
      imageUrl,
    })

    response.status(200).json(user)
  } catch (error) {
    console.error(error)
    response.status(500).json({
      error: "failed to sync user",
    })
  }
}
