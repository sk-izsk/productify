import { useAuth } from "@clerk/react"
import React from "react"
import { useNavigate, useParams } from "react-router"
import { EditProductForm } from "../components/EditProductForm"
import { useGetProduct } from "../hooks/web/useGetProduct"
import { useUpdateProduct } from "../hooks/web/useUpdateProduct"
import type { Product } from "../types"
import { Screen } from "./Screen"

type EditProductParams = {
  id?: string
}

const EditProductScreen: React.FC = () => {
  const { id } = useParams<EditProductParams>()
  const { userId } = useAuth()
  const navigate = useNavigate()
  const { data: product, isLoading, isError } = useGetProduct(id)
  const updateProduct = useUpdateProduct()
  return (
    <Screen
      isError={isError || !product || product.userId !== userId}
      isLoading={isLoading}
    >
      <EditProductForm
        product={product!}
        isPending={updateProduct.isPending}
        isError={updateProduct.isError}
        onSubmit={(formData: Partial<Product>) => {
          updateProduct.mutate(
            { productId: id as string, formData },
            {
              onSuccess: () => navigate(`/product/${id}`),
            },
          )
        }}
      />
    </Screen>
  )
}

export default EditProductScreen
