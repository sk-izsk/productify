import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { beforeEach, describe, expect, it, vi } from "vitest"
import HomeScreen from "../../src/screen/HomeScreen"

const productsState = vi.hoisted(() => ({
  data: {
    pages: [] as Array<
      Array<{
        id: string
        title: string
        description: string
        imageUrl: string
        userId: string
        createdAt: string
        updatedAt: string
        users?: { name: string | null; imageUrl: string | null }
      }>
    >,
  },
  hasNextPage: false,
  isFetchingNextPage: false,
  fetchNextPage: vi.fn(),
  isLoading: false,
  isError: false,
}))

type Product = {
    id: string
    title: string
    description: string
    imageUrl: string
    userId: string
    createdAt: string
    updatedAt: string
    users?: { name: string | null; imageUrl: string | null }
}

vi.mock("../../src/hooks/web/useGetProducts", () => ({
  useGetProducts: () => productsState,
}))

vi.mock("../../src/components/home/Introduction", () => ({
  Introduction: () => <div>Intro Section</div>,
}))

vi.mock("../../src/components/home/NoProductPlaceholder", () => ({
  NoProductPlaceholder: () => <div>No Products Placeholder</div>,
}))

vi.mock("../../src/components/ProductCard", () => ({
  ProductCard: {
    Root: ({ children }: { children: React.ReactNode }) => (
      <article>{children}</article>
    ),
    Image: ({ alt }: { alt: string }) => <div>{alt}</div>,
    Title: ({ children }: { children: React.ReactNode }) => <h3>{children}</h3>,
    Body: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
    UserDetails: ({ name }: { name?: string | null }) => <span>{name}</span>,
  },
}))

describe("HomeScreen", () => {
  beforeEach(() => {
    productsState.data.pages = []
    productsState.fetchNextPage.mockReset()
    productsState.isLoading = false
    productsState.isError = false
  })

  it("shows the empty state when there are no products", () => {
    render(
      <MemoryRouter>
        <HomeScreen />
      </MemoryRouter>,
    )

    expect(screen.getByText("Intro Section")).toBeInTheDocument()
    expect(screen.getByText("No Products Placeholder")).toBeInTheDocument()
  })

  it("renders the product list when products are available", () => {
    const product: Product = {
      id: "product-1",
      title: "Desk Lamp",
      description: "Warm light",
      imageUrl: "https://example.com/lamp.png",
      userId: "user-1",
      createdAt: "2026-03-18T10:00:00.000Z",
      updatedAt: "2026-03-18T10:00:00.000Z",
      users: {
        name: "Iris",
        imageUrl: "https://example.com/iris.png",
      },
    }

    productsState.data.pages = [[product]]

    render(
      <MemoryRouter>
        <HomeScreen />
      </MemoryRouter>,
    )

    expect(screen.getByRole("heading", { name: "Desk Lamp" })).toBeInTheDocument()
    expect(screen.getByText("Warm light")).toBeInTheDocument()
    expect(screen.getByText("Iris")).toBeInTheDocument()
    expect(screen.queryByText("No Products Placeholder")).not.toBeInTheDocument()
  })
})