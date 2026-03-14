import { LoaderIcon } from "lucide-react"
import type { PropsWithChildren } from "react"

interface ScreenProps extends PropsWithChildren {
  isLoading?: boolean
  error: Error | null
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <LoaderIcon className="size-10 text-primary animate-spin" />
        <p className="text-sm text-base-content/50">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>Something went wrong. Please refresh the page.</span>
      </div>
    )
  }

  return <>{children}</>
}
