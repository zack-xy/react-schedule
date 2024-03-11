import type { FC } from 'react'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { Spin, Typography } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import styles from './common.module.scss'

const { Title } = Typography

const List: FC = () => {
  useTitle('React问卷--我的问卷')
  const [searchParams] = useSearchParams()
  // eslint-disable-next-line no-console
  console.log('keyword', searchParams.get('keyword'))

  const { data = {}, loading } = useLoadQuestionListData()
  const { list = [] } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length > 0 && list.map((q: any) => {
          const { _id } = q
          return <QuestionCard key={_id} {...q}></QuestionCard>
        })}
      </div>
      <div className={styles.footer}>
        上划加载更多......
      </div>
    </>
  )
}

export default List
