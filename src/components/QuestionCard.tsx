import { FC, useState } from 'react'
import { Button, Divider, message, Modal, Popconfirm, Space, Tag } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import type { IQuestion } from '@/types/question.ts'
import { useRequest } from 'ahooks'
import { duplicateQuestionService, updateQuestionService } from '@/services/question.ts'
export const QuestionCard: FC<IQuestion> = props => {
  const nav = useNavigate()
  const [isStarState, setIsStarState] = useState(props.isStar)
  const [isDeletedState, setIsDeleteState] = useState(false)
  const { run: onStar, loading: changeStarLoading } = useRequest(
    async () => {
      await updateQuestionService(props._id, { isStar: !props.isStar })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('已更新')
      },
    }
  )

  const { run: onDelete, loading: deleteLoading } = useRequest(
    async () => await updateQuestionService(props._id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        setIsDeleteState(true)
      },
    }
  )

  const { run: onDuplicate, loading: duplicateLoading } = useRequest(
    async () => {
      return await duplicateQuestionService(props._id)
    },
    {
      manual: true,
      onSuccess(result: any) {
        message.success('复制成功')
        nav(`/question/edit/${result.id}`)
      },
    }
  )
  return isDeletedState ? null : (
    <div className="mb-5 p-3 rounded-[3px] bg-white hover:[box-shadow:0_4px_10px_#e8e8e8]">
      <div className="flex">
        <div className="flex-1">
          <Link
            to={props.isPublished ? `/question/stat/${props._id}` : `/question/edit/${props._id}`}
          >
            <Space>
              {props.isStar && <StarOutlined className="text-red-700" />}
              {props.title}
            </Space>
          </Link>
        </div>
        <div className="flex-1 text-right text-[12px]">
          <Space>
            <Tag color={props.isPublished ? 'processing' : ''}>
              {props.isPublished ? '已发布' : '未发布'}
            </Tag>
            <span>答卷：{props.answerCount}</span>
            <span>{props.createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider className="m-3" />
      <div className={'flex'}>
        <div className={'flex-1'}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${props._id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              disabled={!props.isPublished}
              onClick={() => nav(`/question/stat/${props._id}`)}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={'flex-1 text-right'}>
          <Button
            type="text"
            icon={props.isStar ? <StarFilled /> : <StarOutlined />}
            disabled={changeStarLoading}
            onClick={onStar}
          >
            {isStarState ? '取消标星' : '标星'}
          </Button>
          <Popconfirm
            title="确定复制该问卷？"
            okText="确定"
            cancelText="取消"
            onConfirm={onDuplicate}
          >
            <Button type="text" icon={<CopyOutlined />} disabled={duplicateLoading}>
              复制
            </Button>
          </Popconfirm>
          <Button type="text" icon={<DeleteOutlined />} onClick={onDelete} disabled={deleteLoading}>
            删除
          </Button>
        </div>
      </div>
    </div>
  )
}
