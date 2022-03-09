import React, { useState } from "react"

interface Props {
  description: string
  defaultCount: number
}

const Counter = ({ description, defaultCount }: Props) => {
  const [count, setCount] = useState(defaultCount)

  return (
    <div>
      <h2>
        DESC: {description} - DC: {defaultCount}
      </h2>
      <button
        aria-label="Decrement from Counter"
        onClick={() => setCount(count - 1)}
      >
        -
      </button>
      Current Count: {count}
      <button
        aria-label="Increment from Counter"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
    </div>
  )
}

export default Counter
