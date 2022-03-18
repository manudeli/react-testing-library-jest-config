import type { NextPage } from "next"
import Counter from "../components/Counter/Counter"
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
    </div>
  )
}

export default Home
