import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react"
import React from "react"
import type { Product } from "../../types"

interface RootProps {
  children: React.ReactNode
}

interface ImageProps {
  src?: string
  alt?: string
}

interface BodyProps {
  children: React.ReactNode
}

interface TitleProps {
  children: React.ReactNode
}

interface DescriptionProps {
  children: React.ReactNode
}

interface ActionsProps {
  children: React.ReactNode
}

interface ProfileProductCardProps {
  product: Product
  isDeleting?: boolean
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const Root: React.FC<RootProps> = ({ children }) => {
  return <div className="card card-side bg-base-300">{children}</div>
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <figure className="w-32 shrink-0">
      <img src={src} alt={alt} className="h-full object-cover" />
    </figure>
  )
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return <div className="card-body p-4">{children}</div>
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <h2 className="card-title text-base">{children}</h2>
}

const Description: React.FC<DescriptionProps> = ({ children }) => {
  return <p className="text-sm text-base-content/60 line-clamp-1">{children}</p>
}

const Actions: React.FC<ActionsProps> = ({ children }) => {
  return <div className="card-actions justify-end mt-2">{children}</div>
}

export const ProfileProductCard: React.FC<ProfileProductCardProps> = ({
  product,
  isDeleting,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <Root>
      <Image src={product.imageUrl} alt={product.title} />
      <Body>
        <Title>{product.title}</Title>
        <Description>{product.description}</Description>
        <Actions>
          <button
            onClick={() => onView(product.id)}
            className="btn btn-ghost btn-xs gap-1"
          >
            <EyeIcon className="size-3" /> View
          </button>
          <button
            onClick={() => onEdit(product.id)}
            className="btn btn-ghost btn-xs gap-1"
          >
            <EditIcon className="size-3" /> Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="btn btn-ghost btn-xs text-error gap-1"
            disabled={isDeleting}
          >
            <Trash2Icon className="size-3" /> Delete
          </button>
        </Actions>
      </Body>
    </Root>
  )
}
