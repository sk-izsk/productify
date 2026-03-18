import { Router } from "express"
import {
    createComment,
    deleteComment,
    getCommentById,
    getCommentsByUser,
} from "../controllers/commentController"
import { requireAuthMiddleware } from "../utils/auth"

const router = Router()

router.post("/:productId", requireAuthMiddleware(), createComment)
router.delete("/:commentId", requireAuthMiddleware(), deleteComment)
router.get("/my", requireAuthMiddleware(), getCommentsByUser)
router.get("/:commentId", requireAuthMiddleware(), getCommentById)

export default router
