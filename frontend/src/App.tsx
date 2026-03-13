import { Suspense } from "react"
import { AppRouter } from "./AppRouter"
import { AuthSync } from "./components/AuthSync"
import { Navbar } from "./components/Navbar"

const App = () => {
  return (
    <Suspense
      fallback={<span className="loading loading-ring loading-xl"></span>}
    >
      <AuthSync />
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
