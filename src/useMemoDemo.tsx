import type { FC } from 'react'
import React, { useMemo, useState } from 'react'

const UseMemoDemo: FC = () => {
  const [num1, setNum1] = useState(10)
  const [num2, setNum2] = useState(20)
  const [text, setText] = useState('zack')

  const sum = useMemo(() => {
    return num1 + num2
  }, [num1, num2])

  return (
    <div>
      <p>{sum}</p>
      <button onClick={() => setNum1(num1 + 1)}>
        add num1：
        {num1}
      </button>
      <button onClick={() => setNum2(num2 + 1)}>
        add num2：
        {num2}
      </button>
      <div>
        <input onChange={e => setText(e.target.value)} type="text" value={text} />
      </div>
    </div>
  )
}

export default UseMemoDemo
