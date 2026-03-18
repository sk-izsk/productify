import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"
import { beforeEach, describe, expect, it, vi } from "vitest"
import ProductScreen from "../../src/screen/ProductScreen"

const navigateSpy = vi.hoisted(() => vi.fn())

const routeState = vi.hoisted(() => ({
  id: "product-1",
}))

const clerkState = vi.hoisted(() => ({
  userId: "user-1",
}))

const productState = vi.hoisted(() => ({
  data: {
    id: "product-1",
    title: "Desk Lamp",
    description: "Warm light",
    imageUrl: "https://example.com/lamp.png",
    userId: "user-1",
    createdAt: "2026-03-18T10:00:00.000Z",
    updatedAt: "2026-03-18T10:00:00.000Z",
    comments: [],
    users: {
      id: "user-1",
      email: "owner@example.com",
      name: "Owner",
      imageUrl: "https://example.com/owner.png",
      createdAt: "2026-03-18T10:00:00.000Z",
      updatedAt: "2026-03-18T10:00:00.000Z",
    },
  },
  isLoading: false,
  isError: false,
}))

const deleteState = vi.hoisted(() => ({
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
    useParams: () => routeState,
  }
})

vi.mock("@clerk/react", () => ({
  useAuth: () => clerkState,
}))

vi.mock("../../src/hooks/web/useGetProduct", () => ({
  useGetProduct: () => productState,
}))

vi.mock("../../src/hooks/web/useDeleteProduct", () => ({
  useDeleteProduct: () => deleteState,
}))

vi.mock("../../src/components/product/ProductDetails", () => ({
  ProductDetails: ({ product }: { product?: { title?: string } }) => (
    <div>Product Details: {product?.title}</div>
  ),
}))

vi.mock("../../src/components/product/CommentsSection", () => ({
  CommentsSection: ({ productId }: { productId?: string }) => (
    <div>Comments for {productId}</div>
  ),
}))

describe("ProductScreen", () => {
  beforeEach(() => {
    routeState.id = "product-1"
    clerkState.userId = "user-1"
    productState.isLoading = false
    productState.isError = false
    productState.data = {
      id: "product-1",
      title: "Desk Lamp",
      description: "Warm light",
      imageUrl: "https://example.com/lamp.png",
      userId: "user-1",
      createdAt: "2026-03-18T10:00:00.000Z",
      updatedAt: "2026-03-18T10:00:00.000Z",
      comments: [],
      users: {
        id: "user-1",
        email: "owner@example.com",
        name: "Owner",
        imageUrl: "https://example.com/owner.png",
        createdAt: "2026-03-18T10:00:00.000Z",
        updatedAt: "2026-03-18T10:00:00.000Z",
      },
    }
    deleteState.isPending = false
    deleteState.mutate.mockReset()
    navigateSpy.mockReset()
  })

  it("renders details and comments for the current product", () => {
    render(
      <MemoryRouter>
        <ProductScreen />
      </MemoryRouter>,
    )

    expect(screen.getByText("Product Details: Desk Lamp")).toBeInTheDocument()
    expect(screen.getByText("Comments for product-1")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Desk Lamp" })).toHaveAttribute(
      "src",
      "https://example.com/lamp.png",
    )
  })

  it("shows owner actions and navigates home after delete success", async () => {
    const user = userEvent.setup()
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true)
    deleteState.mutate.mockImplementation(
      (
        _payload: unknown,
        options?: { onSuccess?: () => void },
      ) => {
        options?.onSuccess?.()
      },
    )

    render(
      <MemoryRouter>
        <ProductScreen />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole("button", { name: /delete/i }))

    expect(confirmSpy).toHaveBeenCalledWith("Delete this product permanently?")
    expect(deleteState.mutate).toHaveBeenCalledWith(
      { productId: "product-1" },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    )
    expect(navigateSpy).toHaveBeenCalledWith("/")
  })

  it("hides owner actions for non-owners", () => {
    clerkState.userId = "user-2"

    render(
      <MemoryRouter>
        <ProductScreen />
      </MemoryRouter>,
    )

    expect(screen.queryByRole("button", { name: /delete/i })).not.toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /edit/i })).not.toBeInTheDocument()
  })
})