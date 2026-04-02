import { useAuth } from "@clerk/react"
import React from "react"
import { useNavigate, useParams } from "react-router"
import { ProductForm } from "../components/product/ProductForm"
import { useGetProduct } from "../hooks/web/useGetProduct"
import { useUpdateProduct } from "../hooks/web/useUpdateProduct"
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
      <div className="bg-background min-h-screen">
        <ProductForm
          title="Edit Masterpiece"
          subtitle="Refine the details of your Atelier product."
          backTo="/profile"
          submitLabel="Save Changes"
          errorLabel="Failed to update. Try again."
          initialValues={product}
          isPending={updateProduct.isPending}
          isError={updateProduct.isError}
          onSubmit={(formData) => {
            updateProduct.mutate(
              { productId: id as string, formData },
              {
                onSuccess: () => navigate(`/product/${id}`),
              },
            )
          }}
        >
          <ProductForm.TitleInput />
          <ProductForm.ImageInput />
          <ProductForm.DescriptionInput />
        </ProductForm>
      </div>
    </Screen>
  )
}

export default EditProductScreen
