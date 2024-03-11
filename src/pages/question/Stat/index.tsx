import type { FC } from 'react'
import React from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading, data } = useLoadQuestionData()

  return (
    <div>
      <p>Stat page</p>
      <div>
        {loading ? <p>Loading....</p> : <p>{JSON.stringify(data)}</p>}
      </div>
    </div>
  )
}

export default Stat
