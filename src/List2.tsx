import type { FC } from 'react'
import React, { useState } from 'react'
import { produce } from 'immer'
import QuestionCard from './components/QuestionCard'

const List2: FC = () => {
  const [questionList, setQuestionList] = useState([
    { id: 'q1', title: '问卷1', isPublished: false },
    { id: 'q2', title: '问卷2', isPublished: true },
    { id: 'q3', title: '问卷3', isPublished: false },
    { id: 'q4', title: '问卷4', isPublished: true },
  ])

  function add() {
    const r = Math.random().toString().slice(-3)
    // setQuestionList(questionList.concat({
    //   id: `q5${r}`,
    //   title: `问卷5${r}`,
    //   isPublished: false,
    // }))
    // 使用immer
    setQuestionList(
      produce((draft) => {
        draft.push({
          id: `q5${r}`,
          title: `问卷5${r}`,
          isPublished: false,
        })
      }),
    )
  }

  function del(id: string) {
    // setQuestionList(questionList.filter(item => item.id !== id))
    setQuestionList(produce((draft) => {
      const idx = draft.findIndex(item => item.id === id)
      draft.splice(idx, 1)
    }))
  }

  function publish(id: string) {
    // setQuestionList(questionList.map((item) => {
    //   if (item.id === id)
    //     return { ...item, isPublished: true }
    //   return item
    // }))
    setQuestionList(produce((draft) => {
      const obj = draft.find(item => item.id === id)
      if (obj)
        obj.isPublished = true
    }))
  }

  return (
    <div>
      <h1>问卷列表页2</h1>
      <div>
        {
          questionList.map((question) => {
            const { id, title, isPublished } = question
            return <QuestionCard key={id} id={id} title={title} isPublished={isPublished} del={del} publish={publish}></QuestionCard>
          })
        }
      </div>
      <div>
        <button onClick={add}>新增问卷</button>
      </div>
    </div>
  )
}

export default List2
