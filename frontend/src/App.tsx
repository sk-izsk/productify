import { Suspense } from "react"
import { AppRouter } from "./AppRouter"
import { Navbar } from "./components/Navbar"
import { useAuthContext } from "./contexts/authContext"
import { useUserSync } from "./hooks/web/useUserSync"

const App = () => {
  const { isLoading } = useAuthContext()
  useUserSync()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    )
  }

  return (
    <Suspense
      fallback={<span className="loading loading-ring loading-xl"></span>}
    >
      <div className="min-h-screen bg-base-100">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <AppRouter />
        </main>
      </div>
    </Suspense>
  )
}
export default App
