import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"
import { describe, expect, it, vi } from "vitest"
import { ProductForm } from "../../src/components/product/ProductForm"

describe("ProductForm", () => {
  it("renders initial values and submits edited data", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(
      <MemoryRouter>
        <ProductForm
          title="Edit Product"
          backTo="/profile"
          submitLabel="Save Changes"
          errorLabel="Save failed"
          isPending={false}
          isError={false}
          initialValues={{
            title: "Old title",
            description: "Old description",
            imageUrl: "https://example.com/old-image.png",
          }}
          onSubmit={onSubmit}
        />
      </MemoryRouter>,
    )

    const titleInput = screen.getByPlaceholderText("Product title")
    const imageInput = screen.getByPlaceholderText("Image URL")
    const descriptionInput = screen.getByPlaceholderText("Description")

    expect(titleInput).toHaveValue("Old title")
    expect(imageInput).toHaveValue("https://example.com/old-image.png")
    expect(descriptionInput).toHaveValue("Old description")

    await user.clear(titleInput)
    await user.type(titleInput, "New title")
    await user.clear(descriptionInput)
    await user.type(descriptionInput, "New description")
    await user.click(screen.getByRole("button", { name: "Save Changes" }))

    expect(onSubmit).toHaveBeenCalledWith({
      title: "New title",
      description: "New description",
      imageUrl: "https://example.com/old-image.png",
    })
    expect(screen.getByAltText("Preview")).toHaveAttribute(
      "src",
      "https://example.com/old-image.png",
    )
  })
})