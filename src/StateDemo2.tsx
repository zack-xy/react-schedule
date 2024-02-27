import type { FC } from 'react'
import React, { useState } from 'react'

const Demo: FC = () => {
  const [userInfo, setUserInfo] = useState({ name: 'zack', age: 20 })
  const [list, setList] = useState([1, 2])

  function addAge() {
    // 不可变数据，不直接修改state，传入一个新的值
    setUserInfo({
      ...userInfo,
      name: 'zheng',
      age: 30,
    })
  }

  function addItem() {
    // 这样不可以，不可变数据
    // list.push(3)
    setList(list.concat(3)) // 可以
    setList([...list, 3]) // 可以
  }

  return (
    <div>
      <h2>state不可变数据</h2>
      <div>{JSON.stringify(userInfo)}</div>
      <button onClick={addAge}>add age</button>
      <div>{JSON.stringify(list)}</div>
      <button onClick={addItem}>add item</button>
    </div>
  )
}

export default Demo
