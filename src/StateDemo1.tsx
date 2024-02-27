/* eslint-disable no-console */
import type { FC } from 'react'
import React, { useState } from 'react'

const Demo: FC = () => {
  const [count, setCount] = useState(0)

  function add() {
    // setCount(count + 1)
    // 特点1: 也可以传入一个函数
    setCount(count => count + 1)
    // 特点2: 异步更新
    // 特点3: 直接更新可能会被合并： setCount(count + 1)写2次，并不是加两次。 但是通过函数更新，是不会被合并的
    console.log('current count', count)
    // 如果变量不用于jsx，就不用useState，因为useState更新了，就会重新渲染jsx。用useRef
    // 特点4: 不可变数据
  }
  return (
    <div>
      <button onClick={add}>
        add
        {count}
      </button>
    </div>
  )
}

export default Demo
