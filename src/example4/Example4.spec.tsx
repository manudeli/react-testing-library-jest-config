import { render, screen } from "@testing-library/react"
import { mocked } from "ts-jest/utils"
import Drawer from "../example3/Drawer"
import Example4 from "./Example4"

jest.mock("../example3/Drawer")
mocked(Drawer).mockImplementation(() => <div>mocked: drawer</div>)

describe("Example", () => {
  it("renders MyDrawer", () => {
    render(<Example4 />)
    expect(
      screen.queryByText("Hello Drawer Component!")
    ).not.toBeInTheDocument()
    expect(screen.getByText("mocked: drawer")).toBeInTheDocument()
  })
})
