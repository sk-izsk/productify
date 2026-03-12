import { requireAuth } from "@clerk/express"
import { Router } from "express"
import {
  createComment,
  deleteComment,
  getCommentById,
  getCommentsByUser,
} from "../controllers/commentController"

const router = Router()

router.post("/:productId", requireAuth(), createComment)
router.delete("/:commentId", requireAuth(), deleteComment)
router.get("/my", requireAuth(), getCommentsByUser)
router.get("/:commentId", requireAuth(), getCommentById)

export default router
