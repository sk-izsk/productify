import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"
import { beforeEach, describe, expect, it, vi } from "vitest"
import ProfileScreen from "../../src/screen/ProfileScreen"

const navigateSpy = vi.hoisted(() => vi.fn())

const productsState = vi.hoisted(() => ({
  data: [] as Array<{
    id: string
    title: string
  }>,
  isLoading: false,
  isError: false,
}))

const deleteProductState = vi.hoisted(() => ({
  isPending: false,
  mutate: vi.fn(),
}))

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router",
  )

  return {
    ...actual,
    useNavigate: () => navigateSpy,
  }
})

vi.mock("../../src/hooks/web/useMyProduct", () => ({
  useMyProducts: () => productsState,
}))

vi.mock("../../src/hooks/web/useDeleteProduct", () => ({
  useDeleteProduct: () => deleteProductState,
}))

vi.mock("../../src/components/profile/ProfileProductEmptyPlaceholder", () => ({
  ProfileProductEmptyPlaceholder: () => <div>Empty Profile Placeholder</div>,
}))

vi.mock("../../src/components/profile/ProfileProductCard", () => ({
  ProfileProductCard: ({
    product,
    onView,
    onEdit,
    onDelete,
  }: {
    product: { id: string; title: string }
    onView: (id: string) => void
    onEdit: (id: string) => void
    onDelete: (id: string) => void
  }) => (
    <div>
      <span>{product.title}</span>
      <button onClick={() => onView(product.id)}>View</button>
      <button onClick={() => onEdit(product.id)}>Edit</button>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </div>
  ),
}))

describe("ProfileScreen", () => {
  beforeEach(() => {
    productsState.data = []
    productsState.isLoading = false
    productsState.isError = false
    deleteProductState.isPending = false
    deleteProductState.mutate.mockReset()
    navigateSpy.mockReset()
  })

  it("shows the empty placeholder when the user has no products", () => {
    render(
      <MemoryRouter>
        <ProfileScreen />
      </MemoryRouter>,
    )

    expect(screen.getByText("Empty Profile Placeholder")).toBeInTheDocument()
    expect(screen.getByText("0")).toBeInTheDocument()
  })

  it("wires view, edit, and delete actions for profile products", async () => {
    const user = userEvent.setup()
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true)
    productsState.data = [{ id: "product-1", title: "Desk Lamp" }]

    render(
      <MemoryRouter>
        <ProfileScreen />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole("button", { name: "View" }))
    await user.click(screen.getByRole("button", { name: "Edit" }))
    await user.click(screen.getByRole("button", { name: "Delete" }))

    expect(navigateSpy).toHaveBeenNthCalledWith(1, "/product/product-1")
    expect(navigateSpy).toHaveBeenNthCalledWith(2, "/edit/product-1")
    expect(confirmSpy).toHaveBeenCalledWith("Delete this product?")
    expect(deleteProductState.mutate).toHaveBeenCalledWith({ productId: "product-1" })
  })
})