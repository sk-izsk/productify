import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/react"
import { PlusIcon, UserIcon } from "lucide-react"
import React from "react"
import { Link } from "react-router"
import { ThemeSelector } from "./ThemeSelector"

export const Navbar: React.FC = () => {
  const { isSignedIn } = useAuth()
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-4 md:px-8 h-16 w-full shadow-[0_12px_40px_rgba(25,28,30,0.06)]">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-blue-950 dark:text-white">Atelier</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <span className="text-slate-500 dark:text-slate-400 font-medium hover:text-primary transition-colors cursor-pointer">Gallery</span>
          <span className="text-primary font-semibold border-b-2 border-primary pb-1 cursor-pointer">Collections</span>
          <span className="text-slate-500 dark:text-slate-400 font-medium hover:text-primary transition-colors cursor-pointer">Archives</span>
        </nav>
      </div>
      <div className="flex items-center gap-4 border-l border-outline-variant/30 pl-4 ml-4">
        <ThemeSelector />
        {isSignedIn ? (
          <>
            <Link to="/create" className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low" title="New Product">
              <PlusIcon className="size-5" />
            </Link>
            <Link to="/profile" className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low" title="Profile">
              <UserIcon className="size-5" />
            </Link>
            <div className="h-8 w-8 rounded-full ml-1 flex items-center justify-center">
              <UserButton />
            </div>
          </>
        ) : (
          <>
            <SignInButton mode="modal">
              <button className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-gradient-to-r from-primary to-primary-container text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:opacity-90 active:scale-95 transition-all">Get Started</button>
            </SignUpButton>
          </>
        )}
      </div>
    </header>
  )
}
