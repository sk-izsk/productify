import { requireAuth } from "@clerk/express"
import { Router } from "express"
import {
  createComment,
  getCommentById,
  getCommentsByUser,
} from "../controllers/commentController"
import { deleteComment } from "../db/queries"

const router = Router()

router.post("/:productId", requireAuth(), createComment)
router.delete("/:commentId", requireAuth(), deleteComment)
router.get("/:commentId", requireAuth(), getCommentById)
router.get("/my", requireAuth(), getCommentsByUser)

export default router
