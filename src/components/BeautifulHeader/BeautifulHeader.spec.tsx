import BeautifulHeader from "./BeautifulHeader"
import { render, screen, fireEvent } from "@testing-library/react"
import { createMockRouter } from "../../testUtils"
import { RouterContext } from "next/dist/shared/lib/router-context"

it('renders h1 "Todo ID: 22"', () => {
  render(
    <RouterContext.Provider value={createMockRouter({ query: { id: "22" } })}>
      <BeautifulHeader />
    </RouterContext.Provider>
  )
  expect(screen.getByText("Todo ID: 22")).toBeInTheDocument()
})

it('has an anchor tag with href="/contacts"', () => {
  const id = "33"
  const pathname = "manu"

  render(
    <RouterContext.Provider
      value={createMockRouter({ query: { id }, pathname })}
    >
      <BeautifulHeader />
    </RouterContext.Provider>
  )
  expect(screen.getByText("Contacts Page")).toHaveAttribute(
    "href",
    `/contacts?id=${id}&from=${pathname}`
  )
})

it("when 'Some Action' button is clicked", () => {
  const id = "44"
  const pathname = "ko"
  const basePath = "jonghyeon"

  const router = createMockRouter({ query: { id }, pathname, basePath })

  render(
    <RouterContext.Provider value={router}>
      <BeautifulHeader />
    </RouterContext.Provider>
  )

  fireEvent.click(screen.getByRole("button", { name: "Some Action" }))
  expect(router.push).toHaveBeenCalledWith(
    `/contacts?id=${id}&from=${pathname}&something=${basePath}`
  )
})
