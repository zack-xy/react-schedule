import type { FC } from 'react'
import React from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData()

  return (
    <div>
      <p>Edit page</p>
      <div>
        {loading ? <p>Loading....</p> : <p>{JSON.stringify(data)}</p>}
      </div>
    </div>
  )
}

export default Edit
