import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { Navbar } from "../../src/components/Navbar"

const clerkState = vi.hoisted(() => ({
  isSignedIn: false,
}))

vi.mock("@clerk/react", () => ({
  SignInButton: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignUpButton: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  UserButton: () => <div>User Menu</div>,
  useAuth: () => clerkState,
}))

describe("Navbar", () => {
  beforeEach(() => {
    clerkState.isSignedIn = false
  })

  it("shows auth actions for signed-out users", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )

    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Get Started" })).toBeInTheDocument()
    expect(screen.queryByText("New Product")).not.toBeInTheDocument()
  })

  it("shows product and profile actions for signed-in users", () => {
    clerkState.isSignedIn = true

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )

    expect(screen.getByRole("link", { name: /new product/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /profile/i })).toBeInTheDocument()
    expect(screen.getByText("User Menu")).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: "Get Started" })).not.toBeInTheDocument()
  })
})