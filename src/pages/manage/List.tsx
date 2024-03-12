import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'
import styles from './common.module.scss'

const { Title } = Typography

const List: FC = () => {
  useTitle('React问卷--我的问卷')
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  const [started, setStarted] = useState(false) // 是否已经开始加载
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length

  const { run: loadData, loading } = useRequest(async () => {
    const data = await getQuestionListService({
      page,
      pageSize: LIST_PAGE_SIZE,
      keyword,
    })
    return data
  }, {
    manual: true,
    onSuccess(result) {
      const { list: newList = [], total = 0 } = result
      setList(list.concat(newList))
      setTotal(total)
      setPage(page + 1)
    },
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(() => {
    const elem = containerRef.current
    if (elem === null)
      return
    const domRect = elem.getBoundingClientRect()
    if (domRect === null)
      return
    const { bottom } = domRect
    if (bottom < document.body.clientHeight) {
      // 执行加载
      loadData()
      setStarted(true)
    }
  }, {
    wait: 1000,
  })

  // 页面加载或者url参数变化时，触发加载
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  // 搜索项变化，重置查询
  useEffect(() => {
    setStarted(false)
    setList([])
    setPage(1)
    setTotal(0)
  }, [keyword])

  useEffect(() => {
    if (haveMoreData)
      window.addEventListener('scroll', tryLoadMore)

    // 销毁时解绑事件
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  const LoadMoreContentElem = () => {
    if (!started || loading)
      return <Spin />
    if (total === 0)
      return <Empty description="暂无数据" />
    if (!haveMoreData)
      return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }

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
        {list.length > 0 && list.map((q: any) => {
          const { _id } = q
          return <QuestionCard key={_id} {...q}></QuestionCard>
        })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>
          {LoadMoreContentElem()}
        </div>
      </div>
    </>
  )
}

export default List
