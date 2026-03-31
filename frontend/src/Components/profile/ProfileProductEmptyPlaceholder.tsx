import { ImageIcon, RefreshCcwIcon, SparklesIcon, PackageOpenIcon } from "lucide-react"
import React from "react"
import { Link } from "react-router"

export const ProfileProductEmptyPlaceholder: React.FC = () => {
  return (
    <div className="h-full w-full bg-surface-container-lowest rounded-[2rem] shadow-[0_12px_40px_rgba(25,28,30,0.06)] flex flex-col items-center justify-center p-12 text-center border border-outline-variant/10">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-150"></div>
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute w-48 h-48 bg-surface-container-low rounded-3xl rotate-6 translate-x-4 translate-y-2 opacity-50 border border-outline-variant/20"></div>
          <div className="absolute w-48 h-48 bg-surface-container-high rounded-3xl -rotate-3 opacity-80 border border-outline-variant/20"></div>
          <div className="relative w-48 h-48 bg-background rounded-3xl shadow-xl flex items-center justify-center border border-outline-variant/10">
            <PackageOpenIcon className="size-20 text-outline-variant opacity-50" />
          </div>
        </div>
      </div>

      <div className="max-w-md">
        <h3 className="text-2xl font-bold text-blue-950 mb-3 tracking-tight">Your atelier is quiet</h3>
        <p className="text-on-surface-variant leading-relaxed mb-10">
          You haven't curated any products yet. Start your digital catalog by creating your first masterpiece for the gallery.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link
            to="/create"
            className="bg-gradient-to-r from-primary to-primary-container text-white px-10 py-4 rounded-xl text-base font-bold shadow-xl shadow-primary/30 hover:shadow-primary/40 active:scale-95 transition-all flex items-center gap-3"
          >
            Create First Product
          </Link>
          <button className="text-primary font-semibold text-sm hover:underline py-2 transition-all">
            Import from Archives
          </button>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl pt-12 border-t border-surface-container-low">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-surface-container-low flex items-center justify-center">
            <SparklesIcon className="size-5 text-outline" />
          </div>
          <h4 className="text-sm font-bold text-secondary">Smart Categorization</h4>
          <p className="text-xs text-on-surface-variant">AI-powered tags for your collections</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-surface-container-low flex items-center justify-center">
            <ImageIcon className="size-5 text-outline" />
          </div>
          <h4 className="text-sm font-bold text-secondary">High-Res Previews</h4>
          <p className="text-xs text-on-surface-variant">Optimized assets for luxury displays</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-surface-container-low flex items-center justify-center">
            <RefreshCcwIcon className="size-5 text-outline" />
          </div>
          <h4 className="text-sm font-bold text-secondary">Global Distribution</h4>
          <p className="text-xs text-on-surface-variant">Sync with archival platforms</p>
        </div>
      </div>
    </div>
  )
}
