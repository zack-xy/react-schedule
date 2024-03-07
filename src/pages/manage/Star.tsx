import type { FC } from 'react'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { Empty, Typography } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'

const rawQuestionList = [
  { _id: 'q1', title: '问卷111', isPublished: false, isStar: true, answerCount: 5, createdAt: '2022-01-01 13:00:06' },
  { _id: 'q2', title: '问卷222', isPublished: true, isStar: true, answerCount: 6, createdAt: '2022-02-01 14:00:06' },
]

const { Title } = Typography

const Star: FC = () => {
  useTitle('React问卷--标星问卷')
  const [searchParams] = useSearchParams()
  // eslint-disable-next-line no-console
  console.log('keyword', searchParams.get('keyword'))
  const [questionList, setQuestionList] = useState(rawQuestionList)

  // eslint-disable-next-line no-console
  console.log(setQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && questionList.map((q) => {
          const { _id } = q
          return <QuestionCard key={_id} {...q}></QuestionCard>
        })}
      </div>
      <div className={styles.footer}>
        分页
      </div>
    </>
  )
}

export default Star
