import { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  copySelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from '@/store/componentsReducer'
import useGetComponentInfo from '@/hooks/useGetComponentInfo.ts'
import { ActionCreators } from 'redux-undo'

export const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo()
  const length = componentList.length
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
  const isFirst = selectedIndex <= 0
  const isLast = selectedIndex + 1 >= length
  const { isLocked } = selectedComponent || {}
  function onDelete() {
    dispatch(removeSelectedComponent())
  }
  function onChangeHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }
  function onChangeLocked() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }
  function onCopy() {
    dispatch(copySelectedComponent())
  }
  function onPaste() {
    dispatch(pasteCopiedComponent())
  }
  function onMoveComponent(newIndex: number) {
    dispatch(
      moveComponent({
        oldIndex: selectedIndex,
        newIndex,
      })
    )
  }
  // 撤销
  function undo() {
    dispatch(ActionCreators.undo())
  }
  // 重做
  function redo() {
    dispatch(ActionCreators.redo())
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={onDelete} />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={onChangeHidden} />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={onChangeLocked}
          type={isLocked ? 'primary' : 'default'}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={onCopy} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={onPaste}
          disabled={!copiedComponent}
        />
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          onClick={() => onMoveComponent(selectedIndex - 1)}
          disabled={isFirst}
        />
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={() => onMoveComponent(selectedIndex + 1)}
          disabled={isLast}
        />
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={undo} />
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={redo} />
      </Tooltip>
    </Space>
  )
}
