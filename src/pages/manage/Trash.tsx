import type { FC } from 'react'
import React, { useState } from 'react'
import { useTitle } from 'ahooks'
import { Button, Empty, Modal, Space, Spin, Table, Tag, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import styles from './common.module.scss'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('React问卷--回收站')
  const [selectedIds, setSelectedIds] = useState<string []>([])
  const { data = {}, loading } = useLoadQuestionListData({ isDeleted: true })
  const { list = [] } = data

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
        dataSource={list}
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
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {
          !loading && list.length > 0 && TableElement
        }
      </div>
    </>
  )
}

export default Trash
