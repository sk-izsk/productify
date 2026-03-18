import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { ProfileProductCard } from "../../../src/components/profile/ProfileProductCard"

describe("ProfileProductCard", () => {
  it("renders product details and wires action handlers", async () => {
    const user = userEvent.setup()
    const onView = vi.fn()
    const onEdit = vi.fn()
    const onDelete = vi.fn()

    render(
      <ProfileProductCard
        product={{
          id: "product-1",
          title: "Desk Lamp",
          description: "Warm light",
          imageUrl: "https://example.com/lamp.png",
          userId: "user-1",
          createdAt: "2026-03-18T10:00:00.000Z",
          updatedAt: "2026-03-18T10:00:00.000Z",
        }}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        isDeleting={false}
      />,
    )

    expect(screen.getByRole("heading", { name: "Desk Lamp" })).toBeInTheDocument()
    expect(screen.getByText("Warm light")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Desk Lamp" })).toHaveAttribute(
      "src",
      "https://example.com/lamp.png",
    )

    await user.click(screen.getByRole("button", { name: /view/i }))
    await user.click(screen.getByRole("button", { name: /edit/i }))
    await user.click(screen.getByRole("button", { name: /delete/i }))

    expect(onView).toHaveBeenCalledWith("product-1")
    expect(onEdit).toHaveBeenCalledWith("product-1")
    expect(onDelete).toHaveBeenCalledWith("product-1")
  })

  it("disables delete while a deletion is pending", () => {
    render(
      <ProfileProductCard
        product={{
          id: "product-1",
          title: "Desk Lamp",
          description: "Warm light",
          imageUrl: "https://example.com/lamp.png",
          userId: "user-1",
          createdAt: "2026-03-18T10:00:00.000Z",
          updatedAt: "2026-03-18T10:00:00.000Z",
        }}
        onView={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        isDeleting
      />,
    )

    expect(screen.getByRole("button", { name: /delete/i })).toBeDisabled()
  })
})