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

  it("has 3 required fields on first step", async () => {
    onSubmit.mockClear()
    render(<MultiStepForm onSubmit={onSubmit} />)
    clickNextButton()

    await waitFor(() => {
      expect(getFirstName()).toHaveErrorMessage("Your First Name is Required")
    })

    expect(getCity()).toHaveErrorMessage("city is a required field")
  })

  describe("city field", () => {
    it("shows error when city has less than 8 chars", async () => {
      onSubmit.mockClear()
      render(<MultiStepForm onSubmit={onSubmit} />)
      user.type(getCity(), "Vila")
      user.tab()

      await waitFor(() => {
        expect(getCity()).toHaveErrorMessage(
          "city must be at least 8 characters"
        )
      })
    })

    it("shows error when city has more than 11 chars", async () => {
      onSubmit.mockClear()
      render(<MultiStepForm onSubmit={onSubmit} />)
      user.type(getCity(), "Vila Real123123123123")
      user.tab()

      await waitFor(() => {
        expect(getCity()).toHaveErrorMessage(
          "city must be at most 11 characters"
        )
      })
    })
  })

  describe("money field", () => {
    it("think in a sec", async () => {
      onSubmit.mockClear()
      render(<MultiStepForm onSubmit={onSubmit} />)
      user.type(getFirstName(), "Manu")
      selectJobSituation("Full-Time")
      user.type(getCity(), "Vila Real")
      user.click(getMillionaireCheckbox())
      clickNextButton()

      // 2nd step
      user.type(await findMoney(), "100")
      clickNextButton()

      await waitFor(async () => {
        expect(await findMoney()).toHaveErrorMessage(
          "Because you said you are a millionaire you need to have 1 million"
        )
      })
    })
  })
})

const getFirstName = () => screen.getByRole("textbox", { name: /first name/i })

const getSelectJobSituation = () =>
  screen.getByRole("combobox", { name: /JOB situation/i })

const selectJobSituation = (jobSituation: string) => {
  const dropdown = getSelectJobSituation()
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
