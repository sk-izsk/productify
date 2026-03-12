import { requireAuth } from "@clerk/express"
import { Router } from "express"
import {
  getAllProducts,
  getProductById,
  getUserProducts,
} from "../controllers/productController"
const router = Router()

router.get("/", getAllProducts)

router.get("/my", requireAuth(), getUserProducts)

router.get("/:id", getProductById)

router.post("/", requireAuth(), getUserProducts)

router.put("/:id", requireAuth(), getUserProducts)

router.delete("/:id", requireAuth(), getUserProducts)

export default router
