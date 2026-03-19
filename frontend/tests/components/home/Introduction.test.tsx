import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { Introduction } from "../../../src/components/home/Introduction"

const clerkState = vi.hoisted(() => ({
  isSignedIn: false,
}))

vi.mock("@clerk/react", () => ({
  SignInButton: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: () => clerkState,
}))

describe("Introduction", () => {
  beforeEach(() => {
    clerkState.isSignedIn = false
  })

  it("shows a sign-in CTA for signed-out users", () => {
    render(
      <MemoryRouter>
        <Introduction />
      </MemoryRouter>,
    )

    expect(screen.getByText("Share Your", { exact: false })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /start selling/i })).toBeInTheDocument()
  })

  it("links authenticated users to create product flow", () => {
    clerkState.isSignedIn = true

    render(
      <MemoryRouter>
        <Introduction />
      </MemoryRouter>,
    )

    expect(screen.getByRole("link", { name: /start selling/i })).toHaveAttribute(
      "href",
      "/create",
    )
  })
})