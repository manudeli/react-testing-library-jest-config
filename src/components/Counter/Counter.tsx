import React, { useState } from "react"

interface Props {
  description: string
  defaultCount: number
}

const Counter = ({ description, defaultCount }: Props) => {
  const [count, setCount] = useState(defaultCount)
  const [incrementor, setIncrementor] = useState(1)

  return (
    <div>
      <h2>
        DESC: {description} - DC: {defaultCount}
      </h2>
      <label>
        Incrementor:
        <input
          value={incrementor}
          onChange={(e) => setIncrementor(() => parseInt(e.target.value) || 0)}
          type="number"
        />
      </label>
      <button
        aria-label="Subtract from Counter"
        onClick={() => setCount(count - incrementor)}
      >
        -
      </button>
      Current Count: {count}
      <button
        aria-label="Add to Counter"
        onClick={() => setTimeout(() => setCount(count + incrementor), 200)}
      >
        +
      </button>
    </div>
  )
}

export default Counter
