/* eslint-disable no-console */
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { produce } from 'immer'
import QuestionCard from './components/QuestionCard'

const List2: FC = () => {
  // 空数组，无依赖，组件初次渲染时触发
  // React18开发环境会执行2次，生产环境执行1次
  // 开发环境模拟创建、销毁、再创建流程，为了暴露可能的问题
  useEffect(() => {
    console.log('副作用')
  }, [])

  const [questionList, setQuestionList] = useState([
    { id: 'q1', title: '问卷1', isPublished: false },
    { id: 'q2', title: '问卷2', isPublished: true },
    { id: 'q3', title: '问卷3', isPublished: false },
    { id: 'q4', title: '问卷4', isPublished: true },
  ])

  useEffect(() => {
    console.log('question list changed')
  }, [questionList])

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
