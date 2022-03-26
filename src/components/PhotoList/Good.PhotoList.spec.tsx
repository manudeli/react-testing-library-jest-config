import { setupServer } from "msw/node"
import { rest } from "msw"
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import { PhotoList } from "./PhotoList"

const server = setupServer(
  rest.get("/api/photos", (req, res, ctx) => {
    const name = req.url.searchParams.get("name") || "Unknown"
    return res(
      ctx.delay(100),
      ctx.json([
        {
          id: 1,
          thumbnailUrl: "/photo1.png",
          title: name + ": Hello World",
          favorite: false,
        },
      ])
    )
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())

// afterEach(() => server.resetHandlers())

describe("after application fully loads", () => {
  beforeEach(async () => {
    /* eslint-disable-next-line */
    render(<PhotoList />)
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))
  })

  it("renders the photos", () => {
    expect(screen.getByText("Unknown: Hello World")).toBeInTheDocument()
  })
})
