import { CalendarIcon, UserIcon } from "lucide-react"
import React from "react"
import type { Product } from "../../types"

interface Props {
  product?: Product
}

interface HeaderProps {
  title?: string
  createdAt?: string
  creatorName?: string | null
}

interface BodyProps {
  description?: string
}

interface UserDetailsProps {
  name?: string | null
  imageUrl?: string | null
}

const Header: React.FC<HeaderProps> = ({ title, createdAt, creatorName }) => {
  return (
    <>
      <h1 className="card-title text-2xl">{title}</h1>

      <div className="flex flex-wrap gap-4 text-sm text-base-content/60 my-2">
        <div className="flex items-center gap-1">
          <CalendarIcon className="size-4" />
          {createdAt ? new Date(createdAt).toLocaleDateString() : "-"}
        </div>
        <div className="flex items-center gap-1">
          <UserIcon className="size-4" />
          {creatorName}
        </div>
      </div>

      <div className="divider my-2"></div>
    </>
  )
}

const Body: React.FC<BodyProps> = ({ description }) => {
  return <p className="text-base-content/80 leading-relaxed">{description}</p>
}

const UserDetails: React.FC<UserDetailsProps> = ({ name, imageUrl }) => {
  if (!name && !imageUrl) {
    return null
  }

  return (
    <>
      <div className="divider my-2"></div>
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={imageUrl || ""} alt={name || ""} />
          </div>
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-base-content/50">Creator</p>
        </div>
      </div>
    </>
  )
}

const ProductDetailsRoot: React.FC<Props> = ({ product }) => {
  return (
    <div className="card bg-base-300">
      <div className="card-body">
        <ProductDetails.Header
          title={product?.title}
          createdAt={product?.createdAt}
          creatorName={product?.users?.name}
        />
        <ProductDetails.Body description={product?.description} />
        <ProductDetails.UserDetails
          name={product?.users?.name}
          imageUrl={product?.users?.imageUrl}
        />
      </div>
    </div>
  )
}

export const ProductDetails = Object.assign(ProductDetailsRoot, {
  Header,
  Body,
  UserDetails,
})
