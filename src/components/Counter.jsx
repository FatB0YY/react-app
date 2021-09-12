import React, { useState } from 'react'

const Counter = function () {
  const [count, setCount] = useState(0)


  function increment() {
    // мы не изменяем счетчик на прямую.
    // мы вызываем функцию, которая для этого предназначена
    setCount(count + 1)
  }

  function decrement() {
    setCount(count - 1)
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

export default Counter