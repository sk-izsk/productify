import { EditIcon, Trash2Icon } from "lucide-react"
import React from "react"
import { Link } from "react-router"
import type { Product } from "../../types"

interface Props {
  product?: Product
  isOwner?: boolean
  onDelete?: () => void
  isDeleting?: boolean
}

export const ProductDetails: React.FC<Props> = ({ product, isOwner, onDelete, isDeleting }) => {
  // calculate mock price
  let pseudoPrice = "€425,000.00"
  if (product?.id) {
    const hash = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    pseudoPrice = `€${(hash * 42).toLocaleString()}.00`
  }

  return (
    <>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">Exclusive Atelier</span>
          <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold uppercase tracking-widest rounded-full">Limited Run</span>
        </div>
        <h2 className="text-4xl font-extrabold text-on-surface tracking-tight leading-tight mb-2">{product?.title}</h2>
        <p className="text-2xl font-light text-primary">{pseudoPrice}</p>
      </div>

      <div className="p-6 bg-surface-container-lowest rounded-xl shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface-variant font-bold text-lg shrink-0">
              {product?.users?.imageUrl ? (
                <img src={product.users.imageUrl} alt={product.users.name || ""} className="w-full h-full object-cover" />
              ) : (
                <span className="uppercase">{product?.users?.name?.charAt(0) || "?"}</span>
              )}
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">Creator</p>
              <p className="text-sm font-bold text-on-surface">{product?.users?.name || "Unknown"}</p>
            </div>
          </div>
          <button className="text-xs font-bold text-primary px-4 py-2 rounded-full border border-outline-variant hover:bg-primary-fixed transition-colors">Follow</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-surface-container-low rounded-lg">
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Performance</p>
          <p className="text-sm font-bold">0-100 in 2.8s</p>
        </div>
        <div className="p-4 bg-surface-container-low rounded-lg">
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Engine</p>
          <p className="text-sm font-bold">V12 Aspirated</p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-on-surface-variant leading-relaxed">
          {product?.description}
        </p>
      </div>

      {isOwner && (
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row gap-4">
          <Link
            to={`/edit/${product?.id}`}
            className="flex-1 bg-gradient-to-tr from-primary to-primary-container text-white py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg"
          >
            <EditIcon className="size-5" />
            Edit Product
          </Link>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="px-8 py-4 rounded-xl border border-error/20 text-error hover:bg-error-container transition-all flex items-center justify-center disabled:opacity-50"
          >
            {isDeleting ? (
              <div className="w-5 h-5 border-2 border-error/30 border-t-error rounded-full animate-spin"></div>
            ) : (
              <Trash2Icon className="size-5" />
            )}
          </button>
        </div>
      )}
    </>
  )
}
