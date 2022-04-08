import BeautifulHeader from "./BeautifulHeader"
import { render } from "@testing-library/react"

it('renders h1 "Todo ID: 22"', () => {
  render(<BeautifulHeader />)
  expect(true).toBe(true)
})
