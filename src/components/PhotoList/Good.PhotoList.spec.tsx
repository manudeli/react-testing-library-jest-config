import { setupServer } from "msw/node"
import { DefaultRequestBody, PathParams, rest } from "msw"
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import user from "@testing-library/user-event"
import { PhotoList } from "./PhotoList"
import { Photo } from "../../models/Photo"

const server = setupServer(
  rest.get<DefaultRequestBody, PathParams, Photo[]>(
    "/api/photos",
    (req, res, ctx) => {
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
    }
  )
)

beforeAll(() => server.listen())
afterAll(() => server.close())

// afterEach(() => server.resetHandlers())

describe("after application fully loads", () => {
  it("renders the photos", async () => {
    render(<PhotoList />)
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))
    expect(screen.getByText("Unknown: Hello World")).toBeInTheDocument()
  })

  it("renders the newly loaded data", async () => {
    render(<PhotoList />)
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))
    expect(screen.queryByText("Hello World")).not.toBeInTheDocument()
    expect(screen.queryByText("New Loaded Data")).not.toBeInTheDocument()
  })

  describe('when clicking in "Refresh" Button', () => {
    it("renders the newly loaded data", async () => {
      render(<PhotoList />)
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))
      user.type(screen.getByLabelText("Your Name:"), "Bruno")
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))
      expect(screen.getByText("Bruno: Hello World")).toBeInTheDocument()
    })
  })
})
