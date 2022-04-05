import { FormControl, FormHelperText, InputLabel } from "@material-ui/core"
import { ErrorMessage, Field, useField } from "formik"
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
        component={Select}
        native
        name="job"
        inputProps={{
          id: "job",
        }}
      >
        {field.value !== "EMPTY" ? null : (
          <option value="EMPTY">Select your job situation</option>
        )}
        <option value="FULL">Full-Time</option>
        <option value="PART">Part-Time</option>
        <option value="UNEMPLOYED">Unemployed</option>
      </Field>
      <ErrorMessage name="job">
        {(message) => <FormHelperText>{message}</FormHelperText>}
      </ErrorMessage>
    </FormControl>
  )
}

export default CustomDropdown
