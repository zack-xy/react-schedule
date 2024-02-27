/* eslint-disable no-console */
import type { FC } from 'react'
import React, { useCallback, useState } from 'react'

const UseCallbackDemo: FC = () => {
  const [text, setText] = useState('zack')

  const fn1 = () => console.log('fn1 text:', text)
  const fn2 = useCallback(() => {
    console.log('fn2 text: ', text)
  }, [text])

  return (
    <div>
      <input type="text" onChange={e => setText(e.target.value)} value={text} />
      <button onClick={fn1}>fn1</button>
      <button onClick={fn2}>fn2</button>
    </div>
  )
}

export default UseCallbackDemo
