import { SignInButton, useAuth } from "@clerk/react"
import { SparklesIcon } from "lucide-react"
import React from "react"
import { Link } from "react-router"

export const Introduction: React.FC = () => {
  const { isSignedIn } = useAuth()

  return (
    <div className="hero bg-linear-to-br from-base-300 via-base-200 to-base-300 rounded-box overflow-hidden">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10 py-10">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-110" />
          <img
            src="/image.png"
            alt="Creator"
            className="relative h-64 lg:h-72 rounded-2xl shadow-2xl"
          />
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Share Your <span className="text-primary">Products</span>
          </h1>
          <p className="py-4 text-base-content/60">
            Upload, discover, and connect with creators.
          </p>
          {isSignedIn ? (
            <Link to="/create" className="btn btn-primary">
              <SparklesIcon className="size-4" />
              Start Selling
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="btn btn-primary">
                <SparklesIcon className="size-4" />
                Start Selling
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  )
}
