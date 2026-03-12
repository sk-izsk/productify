import { requireAuth } from "@clerk/express"
import { Router } from "express"
import { syncUser } from "../controllers/userController"

const router = Router()

// sync the clerkuser to database

router.post("/sync", requireAuth(), syncUser)

export default router
