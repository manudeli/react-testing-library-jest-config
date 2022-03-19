import { fireEvent, render, screen } from "@testing-library/react"
import Example2 from "./Example2"
import { DataGrid } from "@mui/x-data-grid"

jest.mock("@mui/x-data-grid", () => ({
  ...jest.requireActual("@mui/x-data-grid"),
  DataGrid: jest.fn(() => <div>Table</div>),
}))

const mockedDataGrid = jest.mocked(DataGrid)

describe("MyComponent", () => {
  beforeEach(() => {
    mockedDataGrid.mockClear()
  })

  it("renders Material-UI grid with columnDefs and rowData", () => {
    const myOnMoney = jest.fn()
    render(<Example2 onMoney={myOnMoney} />)
    fireEvent.click(screen.getByRole("button", { name: "Give me 33 dollars" }))
    expect(myOnMoney).toHaveBeenCalledTimes(1)
    expect(myOnMoney).toHaveBeenCalledWith(33)
  })

  it("renders table passing the expected props", () => {
    render(<Example2 onMoney={jest.fn()} />)
    expect(mockedDataGrid).toHaveBeenCalledTimes(1)
    expect(mockedDataGrid).toHaveBeenCalledWith(
      {
        rows: [
          { id: 1, col1: "Hello", col2: "World" },
          { id: 2, col1: "DataGridPro", col2: "is Awesome" },
          { id: 3, col1: "MUI", col2: "is Amazing" },
        ],
        columns: [
          expect.objectContaining({ field: "col1" }),
          expect.objectContaining({ field: "col2" }),
        ],
        pageSize: 5,
        checkboxSelection: true,
      },
      {}
    )
  })
})
