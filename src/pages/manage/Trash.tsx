import { FC, useState } from 'react'
import { Button, Empty, message, Modal, Space, Spin, Table, Tag, Typography } from 'antd'
import { IQuestion } from '@/types/question.ts'
import type { ColumnsType } from 'antd/es/table'
import { ExclamationOutlined } from '@ant-design/icons'
import { ListSearch } from '@/components/ListSearch.tsx'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData.ts'
import { ListPage } from '@/components/ListPage.tsx'
import { useRequest } from 'ahooks'
import { deleteQuestionService, updateQuestionService } from '@/services/question.ts'

const { Title } = Typography
const { confirm } = Modal
export const Trash: FC = () => {
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const tableColumns: ColumnsType<IQuestion> = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => (
        <Tag color={isPublished ? 'processing' : ''}>{isPublished ? '已发布' : '未发布'}</Tag>
      ),
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

  const { run: onRecover, loading: recoverLoading } = useRequest(
    async () => {
      // 异步执行数组
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('恢复成功')
        refresh()
        setSelectedIds([])
      },
    }
  )

  const { run: deleteQuestion } = useRequest(async () => await deleteQuestionService(selectedIds), {
    manual: true,
    onSuccess() {
      message.success('删除成功')
      refresh()
      setSelectedIds([])
    },
  })
  function onDelete() {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationOutlined />,
      content: '删除以后不可以找回',
      onOk: () => deleteQuestion(),
    })
  }
  const TableElement = (
    <>
      <div className="mb-2">
        <Space>
          <Button
            type="primary"
            disabled={!selectedIds.length && recoverLoading}
            onClick={onRecover}
          >
            恢复
          </Button>
          <Button danger disabled={!selectedIds.length} onClick={onDelete}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
      />
    </>
  )
  return (
    <>
      <header className="flex justify-between">
        <div className="flex-1">
          <Title level={3}>回收站</Title>
        </div>
        <div className="text-right">
          <ListSearch />
        </div>
      </header>
      <div className="mb-5">
        {loading && (
          <div className="text-center">
            <Spin />
          </div>
        )}
        {!loading && !list.length && <Empty description="暂无数据" />}
        {!loading && list.length && TableElement}
      </div>
      <div className="text-center">
        <ListPage total={total} />
      </div>
    </>
  )
}
