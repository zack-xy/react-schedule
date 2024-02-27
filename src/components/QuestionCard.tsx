import type { FC } from 'react'
import React from 'react'
import './QuestionCard.css'

interface Props {
  id: string
  title: string
  isPublished: boolean
  del?: (id: string) => void
  publish?: (id: string) => void
}

const QuestionCard: FC<Props> = (props) => {
  const { id, title, isPublished, del, publish } = props

  function publishQuestion(id: string) {
    publish && publish(id)
  }

  function deleteQuestion(id: string) {
    del && del(id)
  }

  return (
    <div className="question-item">
      <strong>{title}</strong>
      &nbsp;
      { isPublished
        ? <span style={{ color: 'green' }}>已发布</span>
        : <span>未发布</span>}
      &nbsp;
      <button onClick={() => publishQuestion(id)}>发布问卷</button>
      &nbsp;
      <button onClick={() => deleteQuestion(id)}>删除问卷</button>
    </div>
  )
}

export default QuestionCard
