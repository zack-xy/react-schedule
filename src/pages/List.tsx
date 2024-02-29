import type { FC } from 'react'
import React, { useState } from 'react'
import QuestionCard from '../components/QuestionCard'
import styles from './List.module.scss'

const rawQuestionList = [
  { _id: 'q1', title: '问卷1', isPublished: false, isStar: true, answerCount: 5, createdAt: '2022-01-01 13:00:06' },
  { _id: 'q2', title: '问卷2', isPublished: true, isStar: false, answerCount: 6, createdAt: '2022-02-01 14:00:06' },
  { _id: 'q3', title: '问卷3', isPublished: false, isStar: true, answerCount: 7, createdAt: '2022-03-01 15:00:06' },
  { _id: 'q4', title: '问卷4', isPublished: true, isStar: false, answerCount: 10, createdAt: '2022-04-01 16:00:08' },
]

const List: FC = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [questionList, setQuestionList] = useState(rawQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>
          搜索
        </div>
      </div>
      <div className={styles.content}>
        {questionList.map((q) => {
          const { _id } = q
          return <QuestionCard key={_id} {...q}></QuestionCard>
        })}
      </div>
      <div className={styles.footer}>
        footer
      </div>
    </>
  )
}

export default List
