import type { FC } from 'react'
import React from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()

  return (
    <div>
      <p>Stat page</p>
      <div>
        {loading ? <p>Loading....</p> : <p>内容</p>}
      </div>
    </div>
  )
}

export default Stat
