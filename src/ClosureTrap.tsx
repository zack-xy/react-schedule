/* eslint-disable no-alert */
import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'

const ClosureTrap: FC = () => {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)

  useEffect(() => {
    countRef.current = count
  }, [count])

  function add() {
    setCount(count + 1)
  }

  function alertFn() {
    setTimeout(() => {
      alert(count) // 异步获取state可能不是最新的，值类型
      alert(countRef.current) // useRef是最新的， 引用类型
    }, 3000)
  }
  return (
    <div>
      <p>闭包陷阱</p>
      <div>
        <span>{count}</span>
        <button onClick={add}>add</button>
        <button onClick={alertFn}>alert</button>
      </div>
    </div>
  )
}

export default ClosureTrap
