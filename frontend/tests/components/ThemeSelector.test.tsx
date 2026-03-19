import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it } from "vitest"
import { ThemeSelector } from "../../src/components/ThemeSelector"

describe("ThemeSelector", () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute("data-theme")
  })

  it("hydrates from localStorage and updates theme selection", async () => {
    localStorage.setItem("theme", "retro")
    const user = userEvent.setup()

    render(<ThemeSelector />)

    expect(document.documentElement).toHaveAttribute("data-theme", "retro")

    await user.click(screen.getByRole("button", { name: /theme/i }))
    await user.click(screen.getByRole("button", { name: /winter/i }))

    expect(document.documentElement).toHaveAttribute("data-theme", "winter")
    expect(localStorage.getItem("theme")).toBe("winter")
  })
})