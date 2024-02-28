/* eslint-disable no-console */
import type { FC } from 'react'
import React, { useEffect } from 'react'
import classnames from 'classnames'

// import './QuestionCard.css'
import styles from './QuestionCard.module.scss'

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

  useEffect(() => {
    return () => {
      console.log('question card unmounted', id)
    }
  }, [])

  // const itemClassName = classnames('question-item', { published: isPublished })
  // const itemClassName = classnames({ 'question-item': true, 'published': isPublished })

  const listItemClass = styles['question-item']
  const publishedClass = styles.published
  const itemClassName = classnames({
    [listItemClass]: true,
    [publishedClass]: isPublished,
  })

  return (
    <div className={itemClassName}>
      <strong>{title}</strong>
      &nbsp;
      { isPublished
        ? <span className={styles['published-span']}>已发布</span>
        : <span>未发布</span>}
      &nbsp;
      <button onClick={() => publishQuestion(id)}>发布问卷</button>
      &nbsp;
      <button onClick={() => deleteQuestion(id)}>删除问卷</button>
    </div>
  )
}

export default QuestionCard
