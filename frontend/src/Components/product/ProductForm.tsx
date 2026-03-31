import { ArrowLeftIcon, CheckCircleIcon, ImageIcon } from "lucide-react"
import React, { createContext, useContext, useEffect, useState } from "react"
import { Link } from "react-router"
import {
  useProductFormData,
  type ProductFormData,
} from "../../hooks/useProductFormData"

interface ProductFormProps {
  title: string
  subtitle?: string
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
  placeholder = "e.g., Midnight Silk Drapery",
}) => {
  const { formData, handleChange } = useProductFormContext()

  return (
    <div className="space-y-2">
      <label className="block text-xs font-label uppercase tracking-widest text-outline ml-1">Product Title</label>
      <input
        name="title"
        type="text"
        placeholder={placeholder}
        className="w-full bg-surface-container-low border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-primary-fixed transition-all text-on-surface placeholder:text-outline/60 outline-none"
        value={formData.title}
        onChange={handleChange}
        required
      />
    </div>
  )
}

const ImageInput: React.FC<BaseInputProps> = ({
  placeholder = "https://images.atelier.com/luxury-fabric-01",
}) => {
  const { formData, handleChange } = useProductFormContext()

  return (
    <div className="space-y-2">
      <label className="block text-xs font-label uppercase tracking-widest text-outline ml-1">Image Reference URL</label>
      <div className="relative">
        <input
          name="imageUrl"
          type="url"
          placeholder={placeholder}
          className="w-full bg-surface-container-low border-none rounded-lg pl-6 pr-12 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-primary-fixed transition-all text-on-surface placeholder:text-outline/60 outline-none"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
        <ImageIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-outline size-5" />
      </div>
    </div>
  )
}

const DescriptionInput: React.FC<BaseInputProps> = ({
  placeholder = "Describe the craftsmanship, materials, and aesthetic intent...",
}) => {
  const { formData, handleChange } = useProductFormContext()

  return (
    <div className="space-y-2">
      <label className="block text-xs font-label uppercase tracking-widest text-outline ml-1">Curated Description</label>
      <textarea
        name="description"
        placeholder={placeholder}
        className="w-full bg-surface-container-low border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-primary-fixed transition-all text-on-surface placeholder:text-outline/60 resize-none outline-none min-h-32"
        value={formData.description}
        onChange={handleChange}
        required
        rows={6}
      />
    </div>
  )
}

const LivePreviewPanel: React.FC = () => {
  const { formData } = useProductFormContext()
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  
  useEffect(() => {
    if (formData.imageUrl) {
      setImgSrc(formData.imageUrl)
    } else {
      setImgSrc(null)
    }
  }, [formData.imageUrl])

  return (
    <div className="bg-surface-container-low p-4 rounded-xl">
      <div className="aspect-[4/5] bg-surface-variant rounded-lg overflow-hidden relative group">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="Product Preview"
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            onError={() => setImgSrc(null)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant/50">
            No Image Provided
          </div>
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/40 to-transparent">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] uppercase tracking-widest rounded-full w-fit mb-3">Live Preview</span>
          <h3 className="text-white text-xl font-bold tracking-tight">{formData.title || "Product Preview"}</h3>
          <p className="text-white/80 text-sm font-light mt-1 line-clamp-2">{formData.description || "Images must be high-resolution (min. 2400px)"}</p>
        </div>
      </div>

      <div className="mt-6 p-6 border border-outline-variant/20 rounded-lg bg-surface-container-lowest mx-auto lg:mx-0 max-w-sm lg:max-w-none">
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Atelier Standards</h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-sm text-on-surface-variant">
            <CheckCircleIcon className="text-primary size-5 shrink-0" />
            <span>Use neutral backgrounds for all product shots.</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-on-surface-variant">
            <CheckCircleIcon className="text-primary size-5 shrink-0" />
            <span>Minimum 300 words for the description field.</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-on-surface-variant">
            <CheckCircleIcon className="text-primary size-5 shrink-0" />
            <span>Highlight sustainable materials in the metadata.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

const ProductFormRoot: React.FC<ProductFormProps> = ({
  title,
  subtitle = "Define a new addition to the Atelier curated collection.",
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
      <DescriptionInput />
    </>
  )

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-12">
        <Link to={backTo} className="group flex items-center gap-2 text-outline hover:text-primary transition-colors w-fit">
          <ArrowLeftIcon className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-label uppercase tracking-widest">Back to Products</span>
        </Link>
        <h1 className="text-4xl font-headline font-bold text-on-surface mt-6 tracking-tight flex items-center gap-3">
          {titleIcon}
          {title}
        </h1>
        <p className="text-on-surface-variant mt-2 font-light">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <ProductFormContext.Provider value={{ formData, handleChange }}>
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 space-y-8 bg-surface-container-lowest p-6 md:p-10 rounded-xl shadow-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                onSubmit(formData)
              }}
              className="space-y-8"
            >
              {fields}

              {isError && (
                <div role="alert" className="p-4 bg-error-container text-on-error-container rounded-lg text-sm font-medium">
                  {errorLabel}
                </div>
              )}

              <div className="pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                <Link to={backTo} className="text-error font-medium px-6 py-3 hover:bg-error-container/30 rounded-lg transition-colors w-full sm:w-auto text-center">
                  Discard Draft
                </Link>
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-gradient-to-br from-primary to-primary-container text-white px-10 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all w-full sm:w-auto disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isPending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <span>{submitLabel}</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Visual Preview */}
          <div className="lg:col-span-5 sticky top-32 w-full max-w-sm mx-auto lg:max-w-none">
            <LivePreviewPanel />
          </div>
        </ProductFormContext.Provider>
      </div>
    </div>
  )
}

export const ProductForm = Object.assign(ProductFormRoot, {
  TitleInput,
  ImageInput,
  DescriptionInput,
})
