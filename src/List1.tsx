/* eslint-disable no-console */
import type { FC } from 'react'
import React from 'react'
import './List1.css'

interface Props {
  title: string
}

const List1: FC<Props> = (props) => {
  const questionList = [
    { id: 'q1', title: '问卷1', isPublished: false },
    { id: 'q2', title: '问卷2', isPublished: true },
    { id: 'q3', title: '问卷3', isPublished: false },
    { id: 'q4', title: '问卷4', isPublished: true },
    { id: 'q5', title: '问卷5', isPublished: false },
  ]

  function editQuestion(id: string) {
    console.log('edit', id)
  }

  return (
    <>
      <h1>{props.title}</h1>
      <div>
        {
          questionList.map((question) => {
            const { id, title, isPublished } = question
            return (
              <div key={id} className="question-item">
                <strong>{title}</strong>
                &nbsp;
                { isPublished
                  ? <span style={{ color: 'green' }}>已发布</span>
                  : <span>未发布</span>}
                &nbsp;
                <button onClick={() => editQuestion(id)}>编辑问卷</button>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default List1
