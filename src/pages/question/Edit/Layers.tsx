import { ChangeEvent, FC, useState } from 'react'
import useGetComponentInfo from '@/hooks/useGetComponentInfo.ts'
import { Button, Input, message, Space } from 'antd'
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  moveComponent,
  toggleComponentLocked,
} from '@/store/componentsReducer'
import { useDispatch } from 'react-redux'
import { EyeOutlined, LockOutlined } from '@ant-design/icons'
import { SortableContainer } from '@/components/DragSortable/SortableContainer.tsx'
import { SortableItem } from '@/components/DragSortable/SortableItem.tsx'

export const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()
  const [changingTitleId, setChangingTitleId] = useState('')
  function onTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      return message.info('不能选中隐藏的组件')
    }
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
      return
    }
    setChangingTitleId(fe_id)
  }
  // 修改标题
  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle || !selectedId) return
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }
  // 切换显示隐藏
  function onChangeHidden(fe_id: string, isHidden: boolean) {
    if (!selectedId) return
    dispatch(
      changeComponentHidden({
        fe_id,
        isHidden,
      })
    )
  }
  // 切换锁定
  function onChangeLocked(fe_id: string) {
    if (!selectedId) return
    dispatch(
      toggleComponentLocked({
        fe_id,
      })
    )
  }
  const componentListWithId = componentList.map(c => {
    return {
      ...c,
      id: c.fe_id,
    }
  })
  function onDragEnd(oldIndex: number, newIndex: number) {
    console.log('dragend', oldIndex, newIndex)
    dispatch(
      moveComponent({
        oldIndex,
        newIndex,
      })
    )
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={onDragEnd}>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c
        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div
              key={fe_id}
              className="py-1.5  flex"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div
                className={`flex-auto leading-loose ${
                  selectedId === fe_id ? 'text-[#1890ff]' : ''
                }`}
                onClick={() => onTitleClick(fe_id)}
              >
                {fe_id === changingTitleId ? (
                  <Input
                    value={title}
                    onChange={onChangeTitle}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlur={() => setChangingTitleId('')}
                  />
                ) : (
                  title
                )}
              </div>
              <div className="w-[50px] text-end ">
                <Space>
                  <Button
                    className={!isHidden ? 'opacity-20' : ''}
                    icon={<EyeOutlined />}
                    type={isHidden ? 'primary' : 'text'}
                    size="small"
                    shape="circle"
                    onClick={() => onChangeHidden(fe_id, !isHidden)}
                  />
                  <Button
                    className={!isLocked ? 'opacity-20' : ''}
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                    size="small"
                    shape="circle"
                    onClick={() => onChangeLocked(fe_id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}
