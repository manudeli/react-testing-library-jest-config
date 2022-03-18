import React from "react"
import { Button } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"

type Props = {
  onMoney: (number: number) => void
}

const Example2 = ({ onMoney }: Props) => {
  const rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ]
  const columns = [
    { field: "col1", headerName: "Column 1", width: 150 },
    { field: "col2", headerName: "Column 2", width: 150 },
  ]

  return (
    <div>
      <Button onClick={() => onMoney(33)}>Give me 33 dollars</Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </div>
  )
}

export default Example2
