import { render, screen, within, waitFor } from "@testing-library/react"
import user from "@testing-library/user-event"
import MultiStepForm from "./MultiStepForm"

describe("MultiStepForm", () => {
  const onSubmit = jest.fn()

  it("onSubmit is called when all fields pass validation", async () => {
    onSubmit.mockClear()
    render(<MultiStepForm onSubmit={onSubmit} />)
    user.type(getFirstName(), "Manu")
    selectJobSituation("Full-Time")
    user.type(getCity(), "Vila Real")
    user.click(getMillionaireCheckbox())
    clickNextButton()

    // 2nd
    user.type(await findMoney(), "1000000")
    clickNextButton()

    // 3rd
    user.type(await findDescription(), "hello")
    clickSubmitButton()

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        city: "Vila Real",
        description: "hello",
        firstName: "Manu",
        job: "FULL",
        millionaire: true,
        money: 1000000,
      })
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})

const getFirstName = () => screen.getByRole("textbox", { name: /first name/i })

const selectJobSituation = (jobSituation: string) => {
  const dropdown = screen.getByRole("combobox", { name: /JOB situation/i })
  user.selectOptions(
    dropdown,
    within(dropdown).getByRole("option", { name: jobSituation })
  )
}

const getCity = () => screen.getByRole("textbox", { name: /city/i })

const getMillionaireCheckbox = () =>
  screen.getByRole("checkbox", {
    name: /I am a millionaire/i,
  })

const clickNextButton = () =>
  user.click(screen.getByRole("button", { name: /Next/i }))

const clickSubmitButton = () =>
  user.click(screen.getByRole("button", { name: /Submit/i }))

const findMoney = () =>
  screen.findByRole("spinbutton", {
    name: /All the money I have/i,
  })

const findDescription = () =>
  screen.findByRole("textbox", {
    name: /Description/i,
  })
