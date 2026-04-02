import { HeartIcon, ShoppingCartIcon } from "lucide-react"
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
    <Link to={to} className="group cursor-pointer block">
      {children}
    </Link>
  )
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <div className="relative aspect-[4/5] mb-6 rounded-xl overflow-hidden bg-surface-container-low">
      <img
        src={src || ""}
        alt={alt || ""}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={(e) => e.preventDefault()}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:text-primary transition-colors text-black"
        >
          <HeartIcon className="size-5" />
        </button>
        <button 
          onClick={(e) => e.preventDefault()}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:text-primary transition-colors text-black"
        >
          <ShoppingCartIcon className="size-5" />
        </button>
      </div>
    </div>
  )
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <h3 className="text-lg font-bold text-blue-950 tracking-tight">{children}</h3>
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return <p className="text-sm text-on-surface-variant font-light mb-3 line-clamp-1">{children}</p>
}

const UserDetails: React.FC<UserDetailsProps> = ({ name, imageUrl }) => {
  if (!name && !imageUrl) {
    return null
  }

  // Generate initials if image is missing
  const getInitials = (nameStr: string) => {
    return nameStr.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-full bg-secondary-fixed flex items-center justify-center overflow-hidden shrink-0">
        {imageUrl ? (
          <img src={imageUrl} alt={name || ""} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[8px] font-bold text-blue-900">{getInitials(name || "User")}</span>
        )}
      </div>
      <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-medium truncate">
        {name}
      </span>
    </div>
  )
}

const ProductCardRoot: React.FC<ProductCardProps> = ({ product }) => {
  // We simulate a price based on the product ID or hash for aesthetic purposes
  const mockPrice = "$" + ((product.id ? product.id.charCodeAt(0) * 12 : 540) % 2000 + 150).toLocaleString();

  return (
    <ProductCard.Root to={`/product/${product.id}`}>
      <ProductCard.Image src={product.imageUrl} alt={product.title} />
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 min-w-0 pr-4">
          <ProductCard.Title>{product.title}</ProductCard.Title>
          <ProductCard.Body>{product.description}</ProductCard.Body>
          <ProductCard.UserDetails
            name={product.users?.name}
            imageUrl={product.users?.imageUrl}
          />
        </div>
        <span className="text-lg font-light text-primary shrink-0">{mockPrice}</span>
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
