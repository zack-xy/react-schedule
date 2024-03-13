import type { FC } from 'react'
import React, { useState } from 'react'
import { Button, Divider, Modal, Popconfirm, Space, Tag, message } from 'antd'
import { CopyOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, LineChartOutlined, StarOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { duplicateQuestionService, updateQuestionService } from '../services/question'
import styles from './QuestionCard.module.scss'

interface PropsType {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props) => {
  const { _id, title, isPublished, answerCount, createdAt, isStar } = props
  const nav = useNavigate()
  const { confirm } = Modal

  // 标星/取消标星
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(async () => {
    await updateQuestionService(_id, { isStar: !isStarState })
  }, {
    manual: true,
    onSuccess() {
      setIsStarState(!isStarState)
      message.success('已设置')
    },
  })

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功')
        nav(`/question/edit/${result.id}`)
      },
    },
  )

  const [isDeleteState, setIsDeleteState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(async () => await updateQuestionService(_id, { isDeleted: true }), {
    manual: true,
    onSuccess() {
      setIsDeleteState(true)
      message.success('删除成功')
    },
  })

  function hanldeDelete() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    })
  }

  // 已经删除的问卷，不渲染卡片
  if (isDeleteState)
    return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag> }
            <span>
              答卷：
              {answerCount}
            </span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              disabled={changeStarLoading}
              onClick={changeStar}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >

              <Button
                type="text"
                icon={<CopyOutlined />}
                disabled={duplicateLoading}
                size="small"
              >
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              disabled={deleteLoading}
              onClick={hanldeDelete}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
