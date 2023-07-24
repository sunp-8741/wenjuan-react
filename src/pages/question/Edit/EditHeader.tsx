import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { Button, Input, message, Space, Typography } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { EditToolbar } from '@/pages/question/Edit/EditToolbar.tsx'
import useGetPageInfo from '@/hooks/useGetPageInfo.ts'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '@/store/PageInfoReducer.ts'
import useGetComponentInfo from '@/hooks/useGetComponentInfo.ts'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionService } from '@/services/question.ts'

// 问卷标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)
  const dispatch = useDispatch()
  function onTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value
    if (!newTitle) return
    dispatch(changePageTitle(event.target.value))
  }
  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={onTitleChange}
      />
    )
  }
  return (
    <Space>
      <Typography.Title className="!text-[18px] !mb-0 !leading-none">{title}</Typography.Title>
      <Button icon={<EditOutlined />} onClick={() => setEditState(true)} />
    </Space>
  )
}

// 保存按钮
const SaveButton: FC = () => {
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { id } = useParams()
  const { run: onSave, loading } = useRequest(
    async () => {
      if (!id) return
      return await updateQuestionService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
      onSuccess() {
        message.success('更新成功')
      },
    }
  )
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (loading) return
    onSave()
  })
  // 自动保存
  useDebounceEffect(
    () => {
      onSave()
    },
    [componentList, pageInfo],
    {
      wait: 10000,
    }
  )
  return (
    <Button onClick={onSave} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}

// 发布按钮
const PublishButton: FC = () => {
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { id } = useParams()
  const nav = useNavigate()
  const { run: onPublish, loading } = useRequest(
    async () => {
      if (!id) return
      return await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav(`/question/stat/${id}`)
      },
    }
  )
  return (
    <Button type="primary" onClick={onPublish} disabled={loading}>
      发布
    </Button>
  )
}

export const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className="bg-white border-b border-solid border-[#e8e8e8] py-3">
      <div className="flex mx-6">
        <div className="flex-1">
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className="flex-1 text-center">
          <EditToolbar />
        </div>
        <div className="flex-1 text-right">
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}
