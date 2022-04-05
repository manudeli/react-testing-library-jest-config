import type { NextPage } from "next"
import Counter from "../components/Counter/Counter"
import MultiStepForm from "../components/MultiStepForm/MultiStepForm"
import Example2 from "../example2/Example2"

const Home: NextPage = () => {
  return (
    <div>
      <Counter description="hello" defaultCount={0} />
      <Example2
        onMoney={(number) => {
          console.log(number)
        }}
      />
      <MultiStepForm
        onSubmit={(formValues) => {
          console.log(formValues)
        }}
      />
    </div>
  )
}

export default Home
