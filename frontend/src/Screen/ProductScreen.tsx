import { useAuth } from "@clerk/react"
import { ArrowLeftIcon, EditIcon, Trash2Icon } from "lucide-react"
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
  console.log("id: ", id)
  const { userId } = useAuth()
  const navigate = useNavigate()

  const { data: product, isLoading, isError } = useGetProduct(id)
  const { mutate: deleteProduct, isPending } = useDeleteProduct()

  const isOwner = userId === product?.userId

  const handleDelete = () => {
    if (confirm("Delete this product permanently?")) {
      deleteProduct(id as string, {
        onSuccess: () => navigate("/"),
      })
    }
  }

  return (
    <Screen isLoading={isLoading} isError={isError || !product}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="btn btn-ghost btn-sm gap-1">
            <ArrowLeftIcon className="size-4" /> Back
          </Link>
          {isOwner && (
            <div className="flex gap-2">
              <Link
                to={`/edit/${product?.id}`}
                className="btn btn-ghost btn-sm gap-1"
              >
                <EditIcon className="size-4" /> Edit
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-error btn-sm gap-1"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <Trash2Icon className="size-4" />
                )}
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Image */}
          <div className="card bg-base-300">
            <figure className="p-4">
              <img
                src={product?.imageUrl}
                alt={product?.title}
                className="rounded-xl w-full h-80 object-cover"
              />
            </figure>
          </div>

          <ProductDetails product={product} />
        </div>

        {/* Comments */}
        <div className="card bg-base-300">
          <div className="card-body">
            <CommentsSection
              productId={id}
              comments={product?.comments}
              currentUserId={userId!}
            />
          </div>
        </div>
      </div>
    </Screen>
  )
}

export default ProductScreen
