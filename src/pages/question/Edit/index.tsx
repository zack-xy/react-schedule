import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../../../services/question'

const Edit: FC = () => {
  const { id = '' } = useParams()

  useEffect(() => {
    async function fn() {
      const data = await getQuestionService(id)
      // eslint-disable-next-line no-console
      console.log('request data', data)
    }
    fn()
  }, [])

  return (
    <div>
      {id}
    </div>
  )
}

export default Edit
