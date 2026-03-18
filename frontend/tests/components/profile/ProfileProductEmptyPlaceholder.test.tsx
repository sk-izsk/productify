import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import { ProfileProductEmptyPlaceholder } from "../../../src/components/profile/ProfileProductEmptyPlaceholder"

describe("ProfileProductEmptyPlaceholder", () => {
  it("encourages the user to create their first product", () => {
    render(
      <MemoryRouter>
        <ProfileProductEmptyPlaceholder />
      </MemoryRouter>,
    )

    expect(screen.getByText("No products yet")).toBeInTheDocument()
    expect(screen.getByText("Start by creating your first product")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /create product/i })).toHaveAttribute(
      "href",
      "/create",
    )
  })
})