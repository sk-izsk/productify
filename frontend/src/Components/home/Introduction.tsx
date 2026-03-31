import { SignInButton, useAuth } from "@clerk/react"
import React from "react"
import { Link } from "react-router"

export const Introduction: React.FC = () => {
  const { isSignedIn } = useAuth()

  return (
    <div className="relative h-[600px] md:h-[800px] w-full rounded-2xl overflow-hidden group mb-20">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
        style={{ backgroundImage: "url('/image.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-on-surface/60 to-transparent"></div>
      </div>
      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-4xl">
        <span className="text-white/80 font-manrope text-xs uppercase tracking-[0.3em] mb-4">Creator Platform</span>
        <h1 className="text-5xl md:text-7xl font-light text-white leading-tight mb-8 font-headline tracking-tighter">
          Share Your <br/><span className="font-bold italic">Products</span>
        </h1>
        <p className="text-white/90 text-lg font-light mb-12 max-w-lg leading-relaxed">
          Upload, discover, and connect with visionary creators. A global destination for curated objects.
        </p>
        <div className="flex gap-4">
          {isSignedIn ? (
            <Link to="/create" className="bg-white text-primary px-10 py-5 rounded-xl font-semibold tracking-tight hover:bg-primary-fixed transition-all active:scale-95 shadow-xl inline-flex justify-center items-center">
              Start Selling
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="bg-white text-primary px-10 py-5 rounded-xl font-semibold tracking-tight hover:bg-primary-fixed transition-all active:scale-95 shadow-xl">
                Start Selling
              </button>
            </SignInButton>
          )}
          <button className="backdrop-blur-md bg-white/10 text-white border border-white/20 px-8 md:px-10 py-5 rounded-xl font-semibold tracking-tight hover:bg-white/20 transition-all active:scale-95 hidden sm:block">
            Watch Film
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 flex gap-2 hidden md:flex">
        <div className="w-12 h-[2px] bg-white"></div>
        <div className="w-12 h-[2px] bg-white/30"></div>
        <div className="w-12 h-[2px] bg-white/30"></div>
      </div>
    </div>
  )
}
