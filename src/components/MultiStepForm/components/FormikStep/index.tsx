import { FormikConfig, FormikValues } from "formik"

interface Props
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string
}

const FormikStep = ({ children }: Props) => <>{children}</>

export default FormikStep
