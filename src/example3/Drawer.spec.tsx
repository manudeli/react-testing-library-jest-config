import { render, screen } from "@testing-library/react"
import user from "@testing-library/user-event"
import Drawer from "./Drawer"

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  SwipeableDrawer: jest.fn(() => <div>Hello!!!!!!</div>),
}))

describe("Drawer", () => {
  it('shows no "Hello!!!!!!"', () => {
    render(<Drawer />)
    expect(screen.getByText("Hello!!!!!!")).toBeInTheDocument()
  })

  it('clickiing on "Open Drawer" Button shows "Hello!!!!!!"', () => {
    render(<Drawer />)
    user.click(screen.getByRole("button", { name: "Open Drawer" }))
    expect(screen.getByText("Hello!!!!!!")).toBeInTheDocument()
  })
})
