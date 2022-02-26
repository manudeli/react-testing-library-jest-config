import type { NextPage } from "next";
import Counter from "../components/Counter/Counter";

const Home: NextPage = () => {
  return (
    <div>
      Home
      <Counter description="hello" defaultCount={0} />
    </div>
  );
};

export default Home;
