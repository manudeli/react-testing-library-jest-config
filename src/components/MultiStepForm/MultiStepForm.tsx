import { Box, Card, CardContent } from "@material-ui/core"
import { Field } from "formik"
import { CheckboxWithLabel, TextField } from "formik-material-ui"
import { mixed, number, object, string } from "yup"
import {
  CustomDropdown,
  CustomTextFieldWithErrorMessage,
  FormikStep,
  FormikStepper,
} from "./components"
import { sleep } from "./helpers"

interface FormValues {
  firstName: string
  job: string
  millionaire: boolean
  money: number
  description: string
  city: string
}

interface Props {
  onSubmit: (formValue: FormValues) => void
}

const MultiStepForm = ({ onSubmit }: Props) => {
  return (
    <Card>
      <CardContent>
        <FormikStepper<FormValues>
          initialValues={{
            firstName: "",
            job: "EMPTY",
            city: "",
            millionaire: false,
            money: 0,
            description: "",
          }}
          onSubmit={async (values) => {
            await sleep(500)
            onSubmit(values)
          }}
        >
          <FormikStep
            label="Personal Data"
            validationSchema={object({
              firstName: string()
                .required("Your First Name is Required")
                .max(5, `Your name can't be longer than 5 chars`),
              city: string().required().min(8).max(11),
              job: string()
                .required("You need to select your job situation")
                .not(["EMPTY"], "You need to select your job situation"),
            })}
          >
            <Box paddingBottom={2}>
              <Field
                id="firstName"
                fullWidth
                name="firstName"
                component={CustomTextFieldWithErrorMessage}
                label="First Name"
              />
            </Box>

            <Box paddingBottom={2}>
              <CustomDropdown name="job" />
            </Box>

            <Box paddingBottom={2}>
              <Field
                id="city"
                fullWidth
                name="city"
                component={CustomTextFieldWithErrorMessage}
                label="City"
              />
            </Box>

            <Box paddingBottom={2}>
              <Field
                name="millionaire"
                id="millionaire"
                type="checkbox"
                component={CheckboxWithLabel}
                Label={{ label: "I am a millionaire" }}
              />
            </Box>
          </FormikStep>
          <FormikStep
            label="Bank Accounts"
            validationSchema={object({
              money: mixed().when("millionaire", {
                is: true,
                then: number()
                  .required()
                  .min(
                    1_000_000,
                    "Because you said you are a millionaire you need to have 1 million"
                  ),
                otherwise: number().required(),
              }),
            })}
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="money"
                id="money"
                type="number"
                component={CustomTextFieldWithErrorMessage}
                label="All the money I have"
              />
            </Box>
          </FormikStep>
          <FormikStep label="More Info">
            <Box paddingBottom={2}>
              <Field
                fullWidth
                id="description"
                name="description"
                component={CustomTextFieldWithErrorMessage}
                label="Description"
              />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  )
}

export default MultiStepForm
