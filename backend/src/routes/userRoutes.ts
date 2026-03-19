import { Router } from "express"
import { syncUser } from "../controllers/userController"
import { requireAuthMiddleware } from "../utils/auth"

const router = Router()

// sync the clerkuser to database

router.post("/sync", requireAuthMiddleware(), syncUser)

export default router
