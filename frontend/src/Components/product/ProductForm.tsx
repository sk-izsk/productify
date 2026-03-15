import { ArrowLeftIcon, FileTextIcon, ImageIcon, TypeIcon } from "lucide-react"
import React, { createContext, useContext } from "react"
import { Link } from "react-router"
import {
  useProductFormData,
  type ProductFormData,
} from "../../hooks/useProductFormData"

interface ProductFormProps {
  title: string
  backTo: string
  submitLabel: string
  errorLabel: string
  isPending: boolean
  isError: boolean
  initialValues?: Partial<ProductFormData>
  onSubmit: (formData: ProductFormData) => void
  titleIcon?: React.ReactNode
  children?: React.ReactNode
}

interface ProductFormContextValue {
  formData: ProductFormData
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
}

const ProductFormContext = createContext<ProductFormContextValue | null>(null)

const useProductFormContext = () => {
  const context = useContext(ProductFormContext)
  if (!context) {
    throw new Error(
      "ProductForm compound components must be used inside ProductForm",
    )
  }
  return context
}

interface BaseInputProps {
  placeholder?: string
}

const TitleInput: React.FC<BaseInputProps> = ({
  placeholder = "Product title",
}) => {
  const { formData, handleChange } = useProductFormContext()

  return (
    <label className="input input-bordered flex items-center gap-2 bg-base-200">
      <TypeIcon className="size-4 text-base-content/50" />
      <input
        name="title"
        type="text"
        placeholder={placeholder}
        className="grow"
        value={formData.title}
        onChange={handleChange}
        required
      />
    </label>
  )
}

const ImageInput: React.FC<BaseInputProps> = ({
  placeholder = "Image URL",
}) => {
  const { formData, handleChange } = useProductFormContext()

  return (
    <label className="input input-bordered flex items-center gap-2 bg-base-200">
      <ImageIcon className="size-4 text-base-content/50" />
      <input
        name="imageUrl"
        type="url"
        placeholder={placeholder}
        className="grow"
        value={formData.imageUrl}
        onChange={handleChange}
        required
      />
    </label>
  )
}

interface ImageDisplayProps {
  alt?: string
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ alt = "Preview" }) => {
  const { formData } = useProductFormContext()

  if (!formData.imageUrl) {
    return null
  }

  return (
    <div className="rounded-box overflow-hidden">
      <img
        src={formData.imageUrl}
        alt={alt}
        className="w-full h-40 object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none"
        }}
      />
    </div>
  )
}

const DescriptionInput: React.FC<BaseInputProps> = ({
  placeholder = "Description",
}) => {
  const { formData, handleChange } = useProductFormContext()

  return (
    <div className="form-control">
      <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
        <FileTextIcon className="size-4 text-base-content/50 mt-1" />
        <textarea
          name="description"
          placeholder={placeholder}
          className="grow bg-transparent resize-none focus:outline-none min-h-24"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  )
}

const ProductFormRoot: React.FC<ProductFormProps> = ({
  title,
  backTo,
  submitLabel,
  errorLabel,
  isPending,
  isError,
  initialValues,
  onSubmit,
  titleIcon,
  children,
}) => {
  const { formData, handleChange } = useProductFormData(initialValues)

  const fields = children ?? (
    <>
      <TitleInput />
      <ImageInput />
      <ImageDisplay />
      <DescriptionInput />
    </>
  )

  return (
    <div className="max-w-lg mx-auto">
      <Link to={backTo} className="btn btn-ghost btn-sm gap-1 mb-4">
        <ArrowLeftIcon className="size-4" /> Back
      </Link>

      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className="card-title">
            {titleIcon}
            {title}
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit(formData)
            }}
            className="space-y-4 mt-4"
          >
            <ProductFormContext.Provider value={{ formData, handleChange }}>
              {fields}
            </ProductFormContext.Provider>

            {isError && (
              <div role="alert" className="alert alert-error alert-sm">
                <span>{errorLabel}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                submitLabel
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export const ProductForm = Object.assign(ProductFormRoot, {
  TitleInput,
  ImageInput,
  ImageDisplay,
  DescriptionInput,
})
