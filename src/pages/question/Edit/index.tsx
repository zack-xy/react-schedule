import type { FC } from 'react'
import React from 'react'
import { useParams } from 'react-router-dom'

const Edit: FC = () => {
  const { id = '' } = useParams()

  return (
    <div>
      {id}
    </div>
  )
}

export default Edit
