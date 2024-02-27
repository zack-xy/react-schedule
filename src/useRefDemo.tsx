/* eslint-disable no-console */
import type { FC } from 'react'
import React, { useRef } from 'react'

const UseRefDemo: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef('zack')

  function selectInput() {
    const inputEle = inputRef.current
    if (inputEle)
      inputEle.select()
  }

  function changeName() {
    nameRef.current = 'zack zheng'
    console.log(nameRef.current)
  }

  return (
    <div>
      <input ref={inputRef} type="text" defaultValue="Hello Zack" />
      <button onClick={selectInput}>选中input</button>
      <div>{nameRef.current}</div>
      <button onClick={changeName}>change name</button>
    </div>
  )
}

export default UseRefDemo
