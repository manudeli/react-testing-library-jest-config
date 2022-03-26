import type { NextPage } from "next"
import Counter from "../components/Counter/Counter"
import { PhotoList } from "../components/PhotoList/PhotoList"
import Example2 from "../example2/Example2"
import Drawer from "../example3/Drawer"

const Home: NextPage = () => {
  return (
    <div>
      <Counter description="hello" defaultCount={0} />
      <Example2
        onMoney={(number) => {
          console.log(number)
        }}
      />
      <Drawer />
      <PhotoList />
    </div>
  )
}

export default Home
