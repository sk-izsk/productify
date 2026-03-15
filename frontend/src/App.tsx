import { Suspense } from "react"
import { AppRouter } from "./AppRouter"
import { Loader } from "./components/Loader"
import { Navbar } from "./components/Navbar"
import { useAuthContext } from "./contexts/authContext"
import { useUserSync } from "./hooks/web/useUserSync"

const App = () => {
  const { isLoading } = useAuthContext()
  useUserSync()

  if (isLoading) {
    return <Loader fullScreen />
  }

  return (
    <Suspense fallback={<Loader />}>
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
