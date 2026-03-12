import type { Request, Response } from "express"
import * as dbQueries from "../db/queries"
import { requireUserId } from "../utils/auth"

export const createComment = async (request: Request, response: Response) => {
  try {
    const userId = requireUserId(request, response)
    if (!userId) {
      return
    }

    const { productId } = request.params
    const { content } = request.body

    if (!content) {
      return response.status(400).json({
        error: "Content is required",
      })
    }

    const comment = await dbQueries.createComment({
      content,
      productId: productId as string,
      userId,
    })

    response.status(201).json(comment)
  } catch (error) {
    console.error("Error creating comment:", error)
    response.status(500).json({ error: "Failed to create comment" })
  }
}

export const deleteComment = async (request: Request, response: Response) => {
  try {
    const userId = requireUserId(request, response)
    if (!userId) {
      return
    }

    const { commentId } = request.params
    const comment = await dbQueries.getCommentById(commentId as string)

    if (!comment) {
      return response.status(404).json({ error: "Comment not found" })
    }
    if (comment.userId !== userId) {
      return response
        .status(403)
        .json({ error: "Unauthorized to delete this comment" })
    }

    await dbQueries.deleteComment(commentId as string)
    response.status(200).json({ message: "Comment deleted successfully" })
  } catch (error) {
    console.error("Error deleting comment:", error)
    response.status(500).json({ error: "Failed to delete comment" })
  }
}

export const getCommentById = async (request: Request, response: Response) => {
  try {
    const userId = requireUserId(request, response)
    if (!userId) {
      return
    }
    const { commentId } = request.params
    const comment = await dbQueries.getCommentById(commentId as string)

    if (!comment) {
      return response.status(404).json({ error: "Comment not found" })
    }

    response.status(200).json(comment)
  } catch (error) {
    console.error("Error fetching comment:", error)
    response.status(500).json({ error: "Failed to fetch comment" })
  }
}

export const getCommentsByUser = async (
  request: Request,
  response: Response,
) => {
  try {
    const userId = requireUserId(request, response)
    if (!userId) {
      return
    }
    const comments = await dbQueries.getCommentsByUser(userId)

    response.status(200).json(comments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    response.status(500).json({ error: "Failed to fetch comments" })
  }
}
