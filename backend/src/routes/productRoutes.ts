import { Router } from "express"
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getUserProducts,
    updateProduct,
} from "../controllers/productController"
import { requireAuthMiddleware } from "../utils/auth"
const router = Router()

router.get("/", getAllProducts)

router.get("/my", requireAuthMiddleware(), getUserProducts)

router.get("/:id", getProductById)

router.post("/", requireAuthMiddleware(), createProduct)

router.put("/:id", requireAuthMiddleware(), updateProduct)

router.delete("/:id", requireAuthMiddleware(), deleteProduct)

export default router
