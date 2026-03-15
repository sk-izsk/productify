import { PackageIcon } from "lucide-react"
import React from "react"
import { Link } from "react-router"

export const ProfileProductEmptyPlaceholder: React.FC = () => {
  return (
    <div className="card bg-base-300">
      <div className="card-body items-center text-center py-16">
        <PackageIcon className="size-16 text-base-content/20" />
        <h3 className="card-title text-base-content/50">No products yet</h3>
        <p className="text-base-content/40 text-sm">
          Start by creating your first product
        </p>
        <Link to="/create" className="btn btn-primary btn-sm mt-4">
          Create Product
        </Link>
      </div>
    </div>
  )
}
