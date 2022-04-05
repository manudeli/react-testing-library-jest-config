import { TextField, TextFieldProps } from "formik-material-ui"

const CustomTextFieldWithErrorMessage = (props: TextFieldProps) => {
  const hasError = !!props.form.errors[props.field.name]

  const inputProps = hasError
    ? {
        ...props.inputProps,
        "aria-errormessage": `${props.field.name}-helper-text`,
      }
    : props.inputProps

  return <TextField {...props} inputProps={inputProps} />
}

export default CustomTextFieldWithErrorMessage
