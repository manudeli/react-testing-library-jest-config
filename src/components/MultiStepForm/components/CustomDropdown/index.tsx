import { FormControl, InputLabel } from "@material-ui/core"
import { Field, useField } from "formik"
import { Select } from "formik-material-ui"

interface Props {
  name: string
}

const CustomDropdown = ({ name }: Props) => {
  const [field, props] = useField(name)

  return (
    <FormControl fullWidth error={!!props.error}>
      <InputLabel htmlFor="job">Job Situation</InputLabel>
      <Field
        label="Job Situation"
        component={Select}
        inputProps={{
          id: "job",
          "aria-errormessage": props.error ? "job-error" : null,
        }}
        native
        name="job"
      >
        {field.value !== "EMPTY" ? null : (
          <option value="EMPTY">Select your job situation</option>
        )}
        <option value="FULL">Full-Time</option>
        <option value="PART">Part-Time</option>
        <option value="UNEMPLOYED">Unemployed</option>
      </Field>
    </FormControl>
  )
}

export default CustomDropdown
