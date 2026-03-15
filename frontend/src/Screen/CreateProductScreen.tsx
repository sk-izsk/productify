import { SparklesIcon } from "lucide-react"
import React from "react"
import { useNavigate } from "react-router"
import { ProductForm } from "../components/product/ProductForm"
import { useCreateProduct } from "../hooks/web/useCreateProduct"

const CreateProductScreen: React.FC = () => {
  const navigate = useNavigate()
  const { isError, isPending, mutate } = useCreateProduct()

  return (
    <ProductForm
      title="New Product"
      backTo="/"
      submitLabel="Create Product"
      errorLabel="Failed to create. Try again."
      isPending={isPending}
      isError={isError}
      titleIcon={<SparklesIcon className="size-5 text-primary" />}
      onSubmit={(formData) => {
        mutate(formData, {
          onSuccess: () => navigate("/"),
        })
      }}
    >
      <ProductForm.TitleInput />
      <ProductForm.ImageInput />
      <ProductForm.ImageDisplay />
      <ProductForm.DescriptionInput />
    </ProductForm>
  )
}

export default CreateProductScreen
