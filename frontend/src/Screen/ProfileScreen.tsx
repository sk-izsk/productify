import { PlusIcon } from "lucide-react"
import React from "react"
import { Link, useNavigate } from "react-router"
import { ProfileProductCard } from "../components/profile/ProfileProductCard"
import { ProfileProductEmptyPlaceholder } from "../components/profile/ProfileProductEmptyPlaceholder"
import { useDeleteProduct } from "../hooks/web/useDeleteProduct"
import { useMyProducts } from "../hooks/web/useMyProduct"
import { Screen } from "./Screen"

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate()
  const { data: products, isLoading, isError } = useMyProducts()
  const deleteProduct = useDeleteProduct()

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) deleteProduct.mutate(id)
  }

  return (
    <Screen isLoading={isLoading} isError={isError || !products}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Products</h1>
            <p className="text-base-content/60 text-sm">Manage your listings</p>
          </div>
          <Link to="/create" className="btn btn-primary btn-sm gap-1">
            <PlusIcon className="size-4" /> New
          </Link>
        </div>

        <div className="stats bg-base-300 w-full">
          <div className="stat">
            <div className="stat-title">Total Products</div>
            <div className="stat-value text-primary">
              {products?.length || 0}
            </div>
          </div>
        </div>

        {products?.length === 0 ? (
          <ProfileProductEmptyPlaceholder />
        ) : (
          <div className="grid gap-4">
            {products?.map((product) => (
              <ProfileProductCard
                key={product.id}
                product={product}
                isDeleting={deleteProduct.isPending}
                onView={(id) => navigate(`/product/${id}`)}
                onEdit={(id) => navigate(`/edit/${id}`)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </Screen>
  )
}

export default ProfileScreen
