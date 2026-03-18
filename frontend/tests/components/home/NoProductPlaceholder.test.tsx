import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import { NoProductPlaceholder } from "../../../src/components/home/NoProductPlaceholder"

describe("NoProductPlaceholder", () => {
  it("prompts the user to create the first product", () => {
    render(
      <MemoryRouter>
        <NoProductPlaceholder />
      </MemoryRouter>,
    )

    expect(screen.getByText("No products yet")).toBeInTheDocument()
    expect(screen.getByText("Be the first to share something!")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /create product/i })).toHaveAttribute(
      "href",
      "/create",
    )
  })
})