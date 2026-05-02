import { Link } from "react-router"
import type { Product } from "../types"

interface RootProps {
  to: string
  children: React.ReactNode
}

interface ImageProps {
  src?: string | null
  alt?: string | null
}

interface TitleProps {
  children: React.ReactNode
}

interface BodyProps {
  children: React.ReactNode
}

interface UserDetailsProps {
  name?: string | null
  imageUrl?: string | null
}

interface ProductCardProps {
  product: Product
}

const Root: React.FC<RootProps> = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="card bg-base-300 hover:bg-base-200 transition-colors"
    >
      {children}
    </Link>
  )
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <figure className="px-4 pt-4">
      <img
        src={src || ""}
        alt={alt || ""}
        className="rounded-xl h-40 w-full object-cover"
      />
    </figure>
  )
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <h2 className="card-title text-base">{children}</h2>
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return <p className="text-sm text-base-content/70 line-clamp-2">{children}</p>
}

const UserDetails: React.FC<UserDetailsProps> = ({ name, imageUrl }) => {
  if (!name && !imageUrl) {
    return null
  }

  return (
    <div className="flex items-center gap-2 mt-3">
      <div className="avatar">
        <div className="w-6 rounded-full ring-1 ring-primary">
          <img src={imageUrl || ""} alt={name || ""} />
        </div>
      </div>
      <span className="text-xs text-base-content/60">{name}</span>
    </div>
  )
}

const ProductCardRoot: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <ProductCard.Root to={`/product/${product.id}`}>
      <ProductCard.Image src={product.imageUrl} alt={product.title} />
      <div className="card-body p-4">
        <ProductCard.Title>{product.title}</ProductCard.Title>
        <ProductCard.Body>{product.description}</ProductCard.Body>
        <ProductCard.UserDetails
          name={product.users?.name}
          imageUrl={product.users?.imageUrl}
        />
      </div>
    </ProductCard.Root>
  )
}

export const ProductCard = Object.assign(ProductCardRoot, {
  Root,
  Image,
  Title,
  Body,
  UserDetails,
})
