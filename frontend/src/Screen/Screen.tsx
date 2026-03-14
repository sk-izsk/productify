import type { PropsWithChildren } from "react"
import { Link } from "react-router"
import { Loader } from "../components/Loader"

interface ScreenProps extends PropsWithChildren {
  isLoading?: boolean
  isError?: boolean
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Something went wrong</h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
