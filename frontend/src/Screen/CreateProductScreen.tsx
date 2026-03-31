import React from "react"
import { useNavigate } from "react-router"
import { ProductForm } from "../components/product/ProductForm"
import { useCreateProduct } from "../hooks/web/useCreateProduct"

const CreateProductScreen: React.FC = () => {
  const navigate = useNavigate()
  const { isError, isPending, mutate } = useCreateProduct()

  return (
    <div className="bg-background min-h-screen">
      <ProductForm
        title="Create New Masterpiece"
        subtitle="Define a new addition to the Atelier curated collection."
        backTo="/"
        submitLabel="Create Product"
        errorLabel="Failed to create. Try again."
        isPending={isPending}
        isError={isError}
        onSubmit={(formData) => {
          mutate(formData, {
            onSuccess: () => navigate("/"),
          })
        }}
      >
        <ProductForm.TitleInput />
        <ProductForm.ImageInput />
        <ProductForm.DescriptionInput />
      </ProductForm>
    </div>
  )
}

export default CreateProductScreen
