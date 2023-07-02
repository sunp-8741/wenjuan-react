import { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button, Divider, message, Space } from 'antd'
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'
import { createQuestionService } from '@/services/question.ts'
import { useRequest } from 'ahooks'

export const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const {
    loading,
    error,
    run: onCreateClick,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`)
      message.success('创建成功')
    },
  })
  return (
    <div className="flex py-6 w-[1200px] mx-auto my-0">
      <div className="w-[120px]">
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={onCreateClick}
            disabled={loading}
          >
            创建问卷
          </Button>
          <Divider className="border-t-transparent" />
          <Button
            type={pathname.endsWith('list') ? 'default' : 'text'}
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.endsWith('star') ? 'default' : 'text'}
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.endsWith('trash') ? 'default' : 'text'}
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className="flex-1 ml-[60px]">
        <Outlet />
      </div>
    </div>
  )
}
