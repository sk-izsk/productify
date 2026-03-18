import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { CommentsSection } from "../../src/components/product/CommentsSection"

const clerkState = vi.hoisted(() => ({
  isSignedIn: false,
}))

const createCommentState = vi.hoisted(() => ({
  isPending: false,
  mutate: vi.fn(),
}))

const deleteCommentState = vi.hoisted(() => ({
  isPending: false,
  mutate: vi.fn(),
}))

vi.mock("@clerk/react", () => ({
  SignInButton: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: () => clerkState,
}))

vi.mock("../../src/hooks/web/useCreateComment", () => ({
  useCreateComment: () => createCommentState,
}))

vi.mock("../../src/hooks/web/useDeleteComment", () => ({
  useDeleteComment: () => deleteCommentState,
}))

describe("CommentsSection", () => {
  beforeEach(() => {
    clerkState.isSignedIn = false
    createCommentState.isPending = false
    deleteCommentState.isPending = false
    createCommentState.mutate.mockReset()
    deleteCommentState.mutate.mockReset()
  })

  it("shows the sign-in prompt for signed-out users", () => {
    render(<CommentsSection comments={[]} />)

    expect(
      screen.getByText("Sign in to join the conversation"),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument()
  })

  it("submits a new comment and clears the input on success", async () => {
    clerkState.isSignedIn = true
    const user = userEvent.setup()

    createCommentState.mutate.mockImplementation(
      (
        _payload: unknown,
        options?: { onSuccess?: () => void },
      ) => {
        options?.onSuccess?.()
      },
    )

    render(<CommentsSection productId="product-123" comments={[]} />)

    const input = screen.getByPlaceholderText("Add a comment...")
    await user.type(input, "Great product")
    await user.click(screen.getByRole("button"))

    expect(createCommentState.mutate).toHaveBeenCalledWith(
      {
        productId: "product-123",
        content: "Great product",
      },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    )
    expect(input).toHaveValue("")
  })

  it("deletes the current user's comment after confirmation", async () => {
    clerkState.isSignedIn = true
    const user = userEvent.setup()
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true)

    render(
      <CommentsSection
        productId="product-123"
        currentUserId="user-1"
        comments={[
          {
            id: "comment-1",
            content: "Owned comment",
            createdAt: "2026-03-18T10:00:00.000Z",
            productId: "product-123",
            userId: "user-1",
            users: {
              id: "user-1",
              email: "owner@example.com",
              name: "Owner",
              imageUrl: "https://example.com/user.png",
              createdAt: "2026-03-18T10:00:00.000Z",
              updatedAt: "2026-03-18T10:00:00.000Z",
            },
          },
        ]}
      />,
    )

    const buttons = screen.getAllByRole("button")

    await user.click(buttons[1])

    expect(confirmSpy).toHaveBeenCalledWith("Delete?")
    expect(deleteCommentState.mutate).toHaveBeenCalledWith({
      commentId: "comment-1",
    })
  })
})