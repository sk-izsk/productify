import { useAuth } from "@clerk/react"
import { ArrowLeftIcon } from "lucide-react"
import React from "react"
import { Link, useNavigate, useParams } from "react-router"
import { CommentsSection } from "../components/product/CommentsSection"
import { ProductDetails } from "../components/product/ProductDetails"
import { useDeleteProduct } from "../hooks/web/useDeleteProduct"
import { useGetProduct } from "../hooks/web/useGetProduct"
import { Screen } from "./Screen"

type ProductParams = {
  id?: string
}

const ProductScreen: React.FC = () => {
  const { id } = useParams<ProductParams>()
  const { userId } = useAuth()
  const navigate = useNavigate()

  const { data: product, isLoading, isError } = useGetProduct(id)
  const { mutate: deleteProduct, isPending } = useDeleteProduct()

  const isOwner = userId === product?.userId

  const handleDelete = () => {
    if (confirm("Delete this product permanently?")) {
      deleteProduct(
        { productId: id as string },
        {
          onSuccess: () => navigate("/"),
        },
      )
    }
  }

  return (
    <Screen isLoading={isLoading} isError={isError || !product}>
      <div className="max-w-7xl mx-auto space-y-8 py-8 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="group flex items-center gap-2 text-outline hover:text-primary transition-colors w-fit">
            <ArrowLeftIcon className="size-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-label uppercase tracking-widest">Back to Products</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Image Area */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-xl overflow-hidden bg-surface-container-low aspect-[16/10] relative group">
              <img
                src={product?.imageUrl}
                alt={product?.title || "Product Image"}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Mocked 4-grid detail block */}
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-low border-2 border-primary">
                <img src={product?.imageUrl} className="w-full h-full object-cover opacity-100" alt="Detail 1" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-low opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <img src={product?.imageUrl} className="w-full h-full object-cover scale-110" alt="Detail 2" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-low opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <img src={product?.imageUrl} className="w-full h-full object-cover scale-125" alt="Detail 3" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-low opacity-60 hover:opacity-100 transition-opacity cursor-pointer relative">
                <img src={product?.imageUrl} className="w-full h-full object-cover scale-150" alt="Detail 4" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-bold">+12</div>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-5 space-y-8">
            <ProductDetails 
              product={product} 
              isOwner={isOwner} 
              onDelete={handleDelete} 
              isDeleting={isPending} 
            />
          </div>
        </div>

        {/* Comments section */}
        <div className="mt-24 max-w-3xl lg:px-0">
          <CommentsSection
            productId={id}
            comments={product?.comments}
            currentUserId={userId!}
          />
        </div>
      </div>
    </Screen>
  )
}

export default ProductScreen
