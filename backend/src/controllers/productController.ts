import type { Request, Response } from "express"
import * as dbQueries from "../db/queries"
import { requireUserId } from "../utils/auth"
export const getAllProducts = async (request: Request, response: Response) => {
  try {
    const products = await dbQueries.getAllProducts()
    response.status(200).json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    response.status(500).json({ error: "Failed to fetch products" })
  }
}

export const getProductById = async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    const product = await dbQueries.getProductsByUserId(id as string)
    if (!product) {
      response.status(404).json({ error: "No products found" })
    }
    response.status(200).json(product)
  } catch (error) {
    console.error("Error fetching products:", error)
    response.status(500).json({ error: "Failed to fetch products" })
  }
}

export const getUserProducts = async (request: Request, response: Response) => {
  try {
    const userId = requireUserId(request, response)
    if (!userId) {
      return
    }

    const products = await dbQueries.getProductsByUserId(userId)

    response.status(200).json(products)
  } catch (error) {
    console.error("Error fetching user products:", error)
    response.status(500).json({ error: "Failed to fetch user products" })
  }
}

export const createProduct = async (request: Request, response: Response) => {
  try {
    const userId = requireUserId(request, response)
    if (!userId) {
      return
    }

    const { title, description, price, imageUrl } = request.body

    if (!title || !description || !price || !imageUrl) {
      return response.status(400).json({
        error: "Title, description, price and imageUrl are required",
      })
    }

    const newProduct = await dbQueries.createProduct({
      title,
      description,
      imageUrl,
      userId,
    })

    response.status(201).json(newProduct)
  } catch (error) {
    console.error("Error creating product:", error)
    response.status(500).json({ error: "Failed to create product" })
  }
}

export const updateProduct = async (request: Request, response: Response) => {
  try {
    const userId = requireUserId(request, response)
    if (!userId) {
      return
    }
    const { id } = request.params
    const { title, description, price, imageUrl } = request.body

    const existingProduct = await dbQueries.getProductById(id as string)
    if (!existingProduct) {
      return response.status(404).json({ error: "Product not found" })
    }

    if (existingProduct.userId !== userId) {
      return response
        .status(403)
        .json({ error: "Unauthorized to update this product" })
    }
    const updatedProduct = await dbQueries.updateProduct(id as string, {
      title,
      description,
      imageUrl,
    })

    response.status(200).json(updatedProduct)
  } catch (error) {
    console.error("Error updating product:", error)
    response.status(500).json({ error: "Failed to update product" })
  }
}

export const deleteProduct = async (request: Request, response: Response) => {
  try {
    const userId = requireUserId(request, response)
    if (!userId) {
      return
    }
    const { id } = request.params

    const existingProduct = await dbQueries.getProductById(id as string)
    if (!existingProduct) {
      return response.status(404).json({ error: "Product not found" })
    }

    if (existingProduct.userId !== userId) {
      return response
        .status(403)
        .json({ error: "Unauthorized to delete this product" })
    }

    await dbQueries.deleteProduct(id as string)

    response.status(200).json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    response.status(500).json({ error: "Failed to delete product" })
  }
}
