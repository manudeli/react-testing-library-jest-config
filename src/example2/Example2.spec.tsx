import { fireEvent, render, screen } from "@testing-library/react"
import Example2 from "./Example2"

describe("MyComponent", () => {
  it("renders Material-UI grid with columnDefs and rowData", () => {
    const myOnMoney = jest.fn()
    render(<Example2 onMoney={myOnMoney} />)
    fireEvent.click(screen.getByRole("button", { name: "Give me 33 dollars" }))
    expect(myOnMoney).toHaveBeenCalledTimes(1)
    expect(myOnMoney).toHaveBeenCalledWith(33)
  })
})
