import { screen, fireEvent, render } from "@testing-library/react";
import Counter from "./Counter";

describe("컴포넌트 Counter를", () => {
  describe('defaultCount=0 and description="My Counter" 로 초기화합니다.', () => {
    it('"Current Count: 0"라고 렌더링됩니다.', () => {
      render(<Counter defaultCount={0} description="My Counter" />);
      expect(screen.getByText("Current Count: 0")).toBeInTheDocument();
    });

    it("MyCounter라고 타이틀이 렌더링됩니다.", () => {
      render(<Counter defaultCount={0} description="My Counter" />);
      expect(screen.getByText(/my counter/i)).toBeInTheDocument();
    });

    describe("+ 버튼이 클릭 되었을 때", () => {
      render(<Counter defaultCount={0} description="My Counter" />);
      beforeEach(() => {
        fireEvent.click(
          screen.getByRole("button", { name: "Increment from Counter" })
        );
      });

      it("counter = 1이 됩니다.", () => {
        expect(screen.getByText("Current Count: 1")).toBeInTheDocument();
      });
    });

    describe("- 버튼이 클릭 되었을 때", () => {
      render(<Counter defaultCount={0} description="My Counter" />);
      beforeEach(() => {
        fireEvent.click(
          screen.getByRole("button", { name: "Decrement from Counter" })
        );
      });

      it("counter = -1이 됩니다.", () => {
        expect(screen.getByText("Current Count: -1")).toBeInTheDocument();
      });
    });
  });
});
