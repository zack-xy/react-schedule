import type { FC } from 'react'
import React, { useState } from 'react'
import { useTitle } from 'ahooks'
import { Button, Empty, Modal, Space, Table, Tag, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'

const rawQuestionList = [
  { _id: 'q1', title: '问卷1', isPublished: false, isStar: true, answerCount: 5, createdAt: '2022-01-01 13:00:06' },
  { _id: 'q2', title: '问卷2', isPublished: true, isStar: false, answerCount: 6, createdAt: '2022-02-01 14:00:06' },
  { _id: 'q3', title: '问卷3', isPublished: false, isStar: true, answerCount: 7, createdAt: '2022-03-01 15:00:06' },
  { _id: 'q4', title: '问卷4', isPublished: true, isStar: false, answerCount: 10, createdAt: '2022-04-01 16:00:08' },
]

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('React问卷--回收站')
  const [questionList, setQuestionList] = useState(rawQuestionList)
  const [selectedIds, setSelectedIds] = useState<string []>([])

  // eslint-disable-next-line no-console
  console.log(setQuestionList)

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  const TableElement = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>恢复</Button>
          <Button danger disabled={selectedIds.length === 0} onClick={handleDelete}>彻底删除</Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )

  function handleDelete() {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后无法找回',
      onOk: () => {},
    })
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {
          questionList.length > 0 && TableElement
        }
      </div>
    </>
  )
}

export default Trash
