import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { ProductDetails } from "../../../src/components/product/ProductDetails"

describe("ProductDetails", () => {
  it("renders product metadata and creator details", () => {
    render(
      <ProductDetails
        product={{
          id: "product-1",
          title: "Desk Lamp",
          description: "Warm light for small workspaces",
          imageUrl: "https://example.com/lamp.png",
          userId: "user-1",
          createdAt: "2026-03-18T10:00:00.000Z",
          updatedAt: "2026-03-18T10:00:00.000Z",
          users: {
            id: "user-1",
            email: "owner@example.com",
            name: "Owner",
            imageUrl: "https://example.com/owner.png",
            createdAt: "2026-03-18T10:00:00.000Z",
            updatedAt: "2026-03-18T10:00:00.000Z",
          },
          comments: [],
        }}
      />,
    )

    expect(screen.getByRole("heading", { name: "Desk Lamp" })).toBeInTheDocument()
    expect(screen.getByText("Warm light for small workspaces")).toBeInTheDocument()
    expect(screen.getAllByText("Owner").length).toBeGreaterThan(0)
    expect(screen.getByText("Creator")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Owner" })).toHaveAttribute(
      "src",
      "https://example.com/owner.png",
    )
  })

  it("omits creator avatar block when no user details are available", () => {
    render(
      <ProductDetails
        product={{
          id: "product-1",
          title: "Desk Lamp",
          description: "Warm light",
          imageUrl: "https://example.com/lamp.png",
          userId: "user-1",
          createdAt: "2026-03-18T10:00:00.000Z",
          updatedAt: "2026-03-18T10:00:00.000Z",
          comments: [],
        }}
      />,
    )

    expect(screen.queryByText("Creator")).not.toBeInTheDocument()
  })
})