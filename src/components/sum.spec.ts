import { sum } from "./sum"

it('5와 2를 더하면 7이 나와야 합니다.', () => {
    expect(sum(5, 2)).toBe(7)
})