import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { AppRouter } from "../../src/AppRouter"

const authState = vi.hoisted(() => ({
  isAuthenticated: false,
  isLoading: false,
  token: null,
}))

vi.mock("../../src/contexts/authContext", () => ({
  useAuthContext: () => authState,
}))

vi.mock("../../src/lazyComponents", () => ({
  HomeScreen: () => <div>Home Screen</div>,
  ProductScreen: () => <div>Product Screen</div>,
  ProfileScreen: () => <div>Profile Screen</div>,
  CreateProductScreen: () => <div>Create Product Screen</div>,
  EditProductScreen: () => <div>Edit Product Screen</div>,
}))

describe("AppRouter", () => {
  beforeEach(() => {
    authState.isAuthenticated = false
  })

  it("redirects unauthenticated users away from private routes", () => {
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <AppRouter />
      </MemoryRouter>,
    )

    expect(screen.getByText("Home Screen")).toBeInTheDocument()
    expect(screen.queryByText("Profile Screen")).not.toBeInTheDocument()
  })

  it("renders private routes for authenticated users", () => {
    authState.isAuthenticated = true

    render(
      <MemoryRouter initialEntries={["/create"]}>
        <AppRouter />
      </MemoryRouter>,
    )

    expect(screen.getByText("Create Product Screen")).toBeInTheDocument()
  })
})