import { render, screen, within, waitFor } from "@testing-library/react"
import user from "@testing-library/user-event"
import MultiStepForm from "./MultiStepForm"

describe("MultiStepForm", () => {
  const onSubmit = jest.fn()

  it("onSubmit is called when all fields pass validation", async () => {
    onSubmit.mockClear()
    render(<MultiStepForm onSubmit={onSubmit} />)
    user.type(getFirstName(), "Manu")
    const dropdown = screen.getByRole("combobox", { name: /JOB situation/i })
    user.selectOptions(
      dropdown,
      within(dropdown).getByRole("option", { name: "Full-Time" })
    )

    const city = screen.getByRole("textbox", { name: /city/i })
    user.type(city, "Vila Real")

    const checkbox = screen.getByRole("checkbox", {
      name: /I am a millionaire/i,
    })
    user.click(checkbox)

    user.click(screen.getByRole("button", { name: /Next/i }))

    // 2nd
    const money = await screen.findByRole("spinbutton", {
      name: /All the money I have/i,
    })
    user.type(money, "1000000")

    user.click(screen.getByRole("button", { name: /Next/i }))

    // 3rd
    const description = await screen.findByRole("textbox", {
      name: /Description/i,
    })
    user.type(description, "hello")

    user.click(screen.getByRole("button", { name: /Submit/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
    expect(onSubmit).toHaveBeenCalledWith({
      city: "Vila Real",
      description: "hello",
      firstName: "Manu",
      job: "FULL",
      millionaire: true,
      money: 1000000,
    })
  })
})

const getFirstName = () => screen.getByRole("textbox", { name: /first name/i })
