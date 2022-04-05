import { FC, ReactElement } from "react"
import {
  render,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import { DefaultRequestBody, PathParams, rest } from "msw"
import { setupServer } from "msw/node"
import CarBrands from "./CarBrands"
import { MySwrConfig } from "./MySwrConfig"

const server = setupServer(
  rest.get<DefaultRequestBody, PathParams, string[]>(
    `api/cars/france`,
    (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.json([`Custom France B1`, `Custom France B2`])
      )
    }
  ),

  rest.get<DefaultRequestBody, PathParams, string[]>(
    `api/cars/germany`,
    (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.json([`Custom Germany B1`, `Custom Germany B2`])
      )
    }
  ),

  rest.get<DefaultRequestBody, PathParams, { message: string }>(
    `api/cars/italy`,
    (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.status(500),
        ctx.json({ message: "Unit test message" })
      )
    }
  )

  //   rest.get<DefaultRequestBody, PathParams, string[]>(
  //     `api/cars/:country`,
  //     (req, res, ctx) => {
  //       const reqParamsCountry = req.params.country as string

  //       return res(
  //         ctx.delay(100),
  //         ctx.json([`${reqParamsCountry} B1`, `${reqParamsCountry} B2`])
  //       )
  //     }
  //   )
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe("Car Brands", () => {
  describe('when "France" is selected', () => {
    it('renders "Car Brands from France"', async () => {
      customRender(<CarBrands country="France" />)
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))
      expect(screen.getByText("Car Brands from France")).toBeInTheDocument()
      expect(screen.getByText("Custom France B1")).toBeInTheDocument()
      expect(screen.getByText("Custom France B2")).toBeInTheDocument()
    })
  })

  describe('when "Germany" is selected', () => {
    it('renders "Car Brands from Germany"', async () => {
      customRender(<CarBrands country="Germany" />)
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))
      expect(screen.getByText("Car Brands from Germany")).toBeInTheDocument()
      expect(screen.getByText("Custom Germany B1")).toBeInTheDocument()
      expect(screen.getByText("Custom Germany B2")).toBeInTheDocument()
    })
  })

  describe('when "Italy" is selected', () => {
    it("show expected error message", async () => {
      customRender(<CarBrands country="Italy" />)
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))
      expect(screen.getByText("Unit test message")).toBeInTheDocument()
    })
  })

  describe("when no results returned", () => {
    beforeEach(() => {
      server.use(
        rest.get<DefaultRequestBody, PathParams, string[]>(
          `api/cars/france`,
          (req, res, ctx) => {
            return res(ctx.delay(100), ctx.json([]))
          }
        )
      )
    })

    it("show expected no data message", async () => {
      customRender(<CarBrands country="France" />)
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."))
      expect(screen.getByText("No Data to Show")).toBeInTheDocument()
    })
  })
})

const AllTheProviders: FC = ({ children }) => (
  <MySwrConfig swrConfig={{ dedupingInterval: 0, provider: () => new Map() }}>
    {children}
  </MySwrConfig>
)

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options })
