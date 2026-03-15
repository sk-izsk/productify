import React, { useState } from "react"
import type { Product } from "../types"

export type ProductFormData = Pick<
  Product,
  "title" | "description" | "imageUrl"
>

export const useProductFormData = (
  initialValues?: Partial<ProductFormData>,
) => {
  const [formData, setFormData] = useState<ProductFormData>({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    imageUrl: initialValues?.imageUrl ?? "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name as keyof ProductFormData]: value,
    }))
  }

  return {
    formData,
    handleChange,
  }
}
