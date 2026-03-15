import { useAuth } from "@clerk/react"
import { SaveIcon } from "lucide-react"
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
      <ProductForm
        title="Edit Product"
        backTo="/profile"
        submitLabel="Save Changes"
        errorLabel="Failed to update. Try again."
        initialValues={product}
        isPending={updateProduct.isPending}
        isError={updateProduct.isError}
        titleIcon={<SaveIcon className="size-5 text-primary" />}
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
        <ProductForm.ImageDisplay />
        <ProductForm.DescriptionInput />
      </ProductForm>
    </Screen>
  )
}

export default EditProductScreen
