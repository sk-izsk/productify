import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it, vi } from "vitest"
import { Screen } from "../../src/screen/Screen"

vi.mock("../../src/components/Loader", () => ({
  Loader: () => <div>Loading Screen</div>,
}))

describe("Screen", () => {
  it("renders the loader while loading", () => {
    render(
      <MemoryRouter>
        <Screen isLoading>Ready</Screen>
      </MemoryRouter>,
    )

    expect(screen.getByText("Loading Screen")).toBeInTheDocument()
    expect(screen.queryByText("Ready")).not.toBeInTheDocument()
  })

  it("renders the error state when the screen fails", () => {
    render(
      <MemoryRouter>
        <Screen isError>Ready</Screen>
      </MemoryRouter>,
    )

    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Go Home" })).toHaveAttribute(
      "href",
      "/",
    )
  })

  it("renders children when there is no loading or error state", () => {
    render(
      <MemoryRouter>
        <Screen>Ready</Screen>
      </MemoryRouter>,
    )

    expect(screen.getByText("Ready")).toBeInTheDocument()
  })
})