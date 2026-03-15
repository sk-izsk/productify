import { LoaderIcon } from "lucide-react"
import React from "react"

interface LoaderProps {
  fullScreen?: boolean
  label?: string
}

export const Loader: React.FC<LoaderProps> = ({
  fullScreen = false,
  label = "Loading...",
}) => {
  const containerClassName = fullScreen
    ? "min-h-screen bg-base-100 flex flex-col items-center justify-center gap-4"
    : "flex flex-col items-center justify-center py-20 gap-4"

  return (
    <div className={containerClassName}>
      <LoaderIcon className="size-10 text-primary animate-spin" />
      <p className="text-sm text-base-content/50">{label}</p>
    </div>
  )
}
